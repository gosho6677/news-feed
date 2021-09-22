import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPosts } from './postsAPI';

const initialState = {
    posts: [],
    status: 'idle',
    error: '',
};

export const getPostsThunk = createAsyncThunk(
    'posts/getAll',
    async () => {
        const posts = await getPosts();
        return posts;
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
                state.status = 'idle';
                state.posts = action.payload.posts;
            })
            .addCase(getPostsThunk.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message || '';
            });
    }
});

export default postsSlice.reducer;