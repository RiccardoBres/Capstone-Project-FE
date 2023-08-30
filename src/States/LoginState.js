import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState= {
    isAuthenticated: false,
    user: [],
    error: null,
}

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (loginFormData) => {
        try {
            const response = await axios.post('http://localhost:9090/login', loginFormData);
            const token = response.data.token;
            localStorage.setItem('userLoggedIn', JSON.stringify(token));
            return token;
        } catch (error) {
            throw error;
        }
    });

const authSlice = createSlice({
    initialState,
    name: 'auth',
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state) => {
                state.isAuthenticated = false;
                state.user = null;
                state.error = 'Access denied'
            });
    },
});


export const isAuthenticated = (state) => state.loginState.isAuthenticated;
export const LoginUser = (state) => state.loginState.user;
export const loginError = (state) => state.loginState.error;

export default authSlice.reducer;
