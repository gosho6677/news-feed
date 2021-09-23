import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createPost, getPosts } from './postsAPI';

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
    }
});

export default postsSlice.reducer;