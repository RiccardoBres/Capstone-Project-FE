import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

<<<<<<< HEAD
const initialState= {
=======
const initialState = {
>>>>>>> CSS_IMPLEMENTATION
    isAuthenticated: false,
    user: [],
    error: null,
}

export const loginUser = createAsyncThunk(
    'auth/loginUser',
<<<<<<< HEAD
    async (loginFormData) => {
=======
    async (loginFormData, { rejectWithValue }) => {
>>>>>>> CSS_IMPLEMENTATION
        try {
            const response = await axios.post('http://localhost:9090/login', loginFormData);
            const token = response.data.token;
            localStorage.setItem('userLoggedIn', JSON.stringify(token));
            return token;
        } catch (error) {
<<<<<<< HEAD
            throw error;
        }
    });
=======
            console.log(error.response.data.message);
            return rejectWithValue(error.response.data.message);
        }
    }
);

>>>>>>> CSS_IMPLEMENTATION

const authSlice = createSlice({
    initialState,
    name: 'auth',
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload;
            })
<<<<<<< HEAD
            .addCase(loginUser.rejected, (state) => {
                state.isAuthenticated = false;
                state.user = null;
                state.error = 'Access denied'
=======
            .addCase(loginUser.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.user = null;
                state.error = action.payload;
>>>>>>> CSS_IMPLEMENTATION
            });
    },
});


export const isAuthenticated = (state) => state.loginState.isAuthenticated;
export const LoginUser = (state) => state.loginState.user;
export const loginError = (state) => state.loginState.error;

export default authSlice.reducer;
