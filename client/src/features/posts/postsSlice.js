import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { commentPost, createPost, deleteComment, deletePost, dislikePost, getPosts, likePost } from './postsAPI';
import sortHelper from './sortHelper';

const postsAdapter = createEntityAdapter({
    selectId: post => post._id,
    sortComparer: (a, b) => b.iat - a.iat
});

const initialState = postsAdapter.getInitialState({
    status: 'idle',
    error: '',
});

export const getPostsThunk = createAsyncThunk(
    'posts/getAll',
    async () => {
        const posts = await getPosts();
        if (!posts.ok) {
            throw new Error(posts.error);
        }
        return posts;
    }
);

export const createPostThunk = createAsyncThunk(
    'posts/create',
    async (postInfo) => {
        if (postInfo.content.length < 10) {
            throw new Error('Status content must be atleast 10 characters.');
        }

        if (!postInfo.imageUrl.startsWith('https://')) {
            throw new Error('Image must be a valid image url! e.g. https://picture.com');
        }

        const post = await createPost(postInfo);
        if (!post.ok) {
            throw new Error(post.error);
        }
        return post;
    }
);

export const deletePostThunk = createAsyncThunk(
    'posts/delete',
    async (postId) => {
        const postResponse = await deletePost(postId);
        if (!postResponse.ok) {
            throw new Error(postResponse.error);
        }
        return postResponse._id;
    }
);

export const likePostThunk = createAsyncThunk(
    'posts/like',
    async ({ postId, userId }) => {
        const postResponse = await likePost(postId);
        if (!postResponse.ok) {
            throw new Error(postResponse.error);
        }
        postResponse.post.userId = userId;
        return postResponse.post;
    }
);

export const dislikePostThunk = createAsyncThunk(
    'posts/dislike',
    async ({ postId, userId }) => {
        const postResponse = await dislikePost(postId);
        if (!postResponse.ok) {
            throw new Error(postResponse.error);
        }
        postResponse.post.userId = userId;
        return postResponse.post;
    }
);

export const commentPostThunk = createAsyncThunk(
    'posts/comment',
    async ({ postId, description }) => {
        const postResponse = await commentPost(postId, description);
        if (!postResponse.ok) {
            throw new Error(postResponse.error);
        }
        postResponse.comment.postId = postId;
        return postResponse.comment;
    }
);

export const deleteCommentThunk = createAsyncThunk(
    '/posts/deleteComment',
    async ({ postId, commentId }) => {
        const postResponse = await deleteComment(postId, commentId);
        if (!postResponse.ok) {
            throw new Error(postResponse.error);
        }

        return postResponse.resp;
    }
);

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        createPostSync(state, action) {
            postsAdapter.addOne(state, action.payload);
        },
        deletePostSync(state, action) {
            postsAdapter.removeOne(state, action.payload);
        },
        likePostSync(state, action) {
            const post = state.entities[action.payload.postId];
            if (!post.likes.includes(action.payload.userId)) {
                post.likes.push(action.payload.userId);
            }
        },
        dislikePostSync(state, action) {
            const post = state.entities[action.payload.postId];
            post.likes = post.likes.filter(id => id !== action.payload.userId);
        },
        commentPostSync(state, action) {
            const post = state.entities[action.payload.postId];
            let hasComment = post.comments.find(c => c._id === action.payload.comment._id);

            if (!hasComment) {
                post.comments.push(action.payload.comment);
            }
        },
        deleteCommentSync(state, action) {
            const post = state.entities[action.payload.postId];
            post.comments = post.comments.filter(c => c._id !== action.payload.commentId);
        },
        removePostError(state) {
            state.status = state.ids.length ? 'succeeded' : 'idle';
            state.error = '';
        },
        sortPosts(state, action) {
            sortHelper[action.payload](state.ids, state.entities);
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getPostsThunk.pending, state => {
                state.status = 'loading';
            })
            .addCase(getPostsThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                postsAdapter.setAll(state, action.payload.posts);
                // state.posts = action.payload.posts;
                // state.posts.sort((a, b) => b.iat - a.iat);
            })
            .addCase(getPostsThunk.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message || '';
            });

        builder
            .addCase(createPostThunk.pending, state => {
                state.status = 'loading';
            })
            .addCase(createPostThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                postsAdapter.addOne(state, action.payload.post);
                // state.posts.push(action.payload.post);
                // state.posts.sort((a, b) => b.iat - a.iat);
            })
            .addCase(createPostThunk.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message || '';
            });

        builder
            .addCase(deletePostThunk.pending, state => {
                state.status = 'loading';
            })
            .addCase(deletePostThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                postsAdapter.removeOne(state, action.payload);
                // state.posts = state.posts.filter(p => p._id !== action.payload);
            })
            .addCase(deletePostThunk.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message || '';
            });

        builder
            .addCase(likePostThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // const post = state.posts.find(p => p._id === action.payload._id);
                const post = state.entities[action.payload._id];
                if (!post.likes.includes(action.payload.userId)) {
                    post.likes.push(action.payload.userId);
                }
            })
            .addCase(likePostThunk.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message || '';
            });

        builder
            .addCase(dislikePostThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // const post = state.posts.find(p => p._id === action.payload._id);
                const post = state.entities[action.payload._id];
                post.likes = post.likes.filter(p => p !== action.payload.userId);
            })
            .addCase(dislikePostThunk.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message || '';
            });

        builder
            .addCase(commentPostThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const post = state.entities[action.payload.postId];
                let hasComment = post.comments.find(c => c._id === action.payload._id);

                if (!hasComment) {
                    post.comments.push(action.payload);
                }
            })
            .addCase(commentPostThunk.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message || '';
            });

        builder
            .addCase(deleteCommentThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const post = state.entities[action.payload.postId];
                post.comments = post.comments.filter(c => c._id !== action.payload.commentId);
            })
            .addCase(deleteCommentThunk.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message || '';
            });
    }
});

export const selectMyPosts = state => {
    return state.posts.status === 'succeeded' && state.user.status === 'succeeded'
        ? state.posts.ids.filter(id => state.posts.entities[id].owner._id === state.user.user._id)
        : undefined;
};

export const {
    selectAll: selectAllPosts
} = postsAdapter.getSelectors(state => state.posts);
export const {
    createPostSync,
    deletePostSync,
    likePostSync,
    dislikePostSync,
    commentPostSync,
    deleteCommentSync,
    removePostError,
    sortPosts,
} = postsSlice.actions;
export default postsSlice.reducer;