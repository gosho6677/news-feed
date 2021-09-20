import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login, logout, register } from './userAPI';

const initialState = {
    user: null,
    status: 'idle',
    error: '',
};

export const registerUser = createAsyncThunk(
    'user/register',
    async (userDetails) => {
        const user = await register(userDetails);
        return user;
    }
);

export const loginUser = createAsyncThunk(
    'user/login',
    async (userDetails) => {
        const user = await login(userDetails);
        return user;
    }
);

export const logoutUser = createAsyncThunk(
    'user/logout',
    async () => {
        await logout();
        return true;
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        removeError: state => {
            state.status = 'idle';
            state.error = '';
        },
        setUserOnLoad: (state, action) => {
            state.status = 'idle';
            state.user = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(registerUser.pending, state => {
                state.status = 'loading';
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = 'idle';
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message || '';
            });

        builder
            .addCase(loginUser.pending, state => {
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'idle';
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'error';
                state.error = 'Invalid credentials!';
            });

        builder
            .addCase(logoutUser.fulfilled, (state, action) => {
                if (action.payload) {
                    console.log(`>>> logged out`, state);
                    state.user = null;
                }
            });
    }
});

export const { removeError, setUserOnLoad } = userSlice.actions;
export default userSlice.reducer;