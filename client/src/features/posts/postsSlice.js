import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { commentPost, createPost, deleteComment, deletePost, dislikePost, getPosts, likePost } from './postsAPI';

const initialState = {
    posts: [],
    status: 'idle',
    error: '',
};

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
    async ({ postId, commentId}) => {
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
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getPostsThunk.pending, state => {
                state.status = 'loading';
            })
            .addCase(getPostsThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.posts = action.payload.posts;
                state.posts.sort((a, b) => b.iat - a.iat);
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
                state.posts.push(action.payload.post);
                state.posts.sort((a, b) => b.iat - a.iat);
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
                state.posts = state.posts.filter(p => p._id !== action.payload);
            })
            .addCase(deletePostThunk.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message || '';
            });

        builder
            .addCase(likePostThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const post = state.posts.find(p => p._id === action.payload._id);
                post.likes.push(action.payload.userId);
            })
            .addCase(likePostThunk.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message || '';
            });

        builder
            .addCase(dislikePostThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const post = state.posts.find(p => p._id === action.payload._id);
                post.likes = post.likes.filter(p => p !== action.payload.userId);
            })
            .addCase(dislikePostThunk.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message || '';
            });

        builder
            .addCase(commentPostThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const post = state.posts.find(p => p._id === action.payload.postId);
                post.comments.push(action.payload);
            })
            .addCase(commentPostThunk.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message || '';
            });

        builder
            .addCase(deleteCommentThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const post = state.posts.find(p => p._id === action.payload.postId);
                post.comments = post.comments.filter(c => c._id !== action.payload.commentId);
            })
            .addCase(deleteCommentThunk.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message || '';
            });
    }
});

export default postsSlice.reducer;