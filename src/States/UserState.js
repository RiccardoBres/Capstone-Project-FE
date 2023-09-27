import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    isLoading: false,
    user: null,
    userById: null,
    error: null,
    savedBeach: [],
};

export const getUser = createAsyncThunk(
    'user/GetUser',
    async () => {
        try {
            const response = await axios.get('http://localhost:9090/user');
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
)

export const getUserById = createAsyncThunk(
    'userId/getUserByID',
    async(userId) => {
        try {
            const response = await axios.get(`http://localhost:9090/user/${userId}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
)

export const createUser = createAsyncThunk(
    "User/createUser",
    async (user) => {
        const form = new FormData()
        form.append("name", user.name);
        form.append("surname", user.surname);
        form.append("email", user.email);
        form.append("password", user.password);
        form.append("birthday", user.birthday);
        form.append("avatar", user.avatar);
        console.log(...form);
        
        try {
            const res = await axios.post('http://localhost:9090/user/create', form, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            console.log(res);
            return res.data;

        } catch (error) {
            console.log(error)
        }
    }
);

const UserSlice = createSlice({
    name: 'userState',
    initialState,
    reducers: {
        addSavedBeach: (state, action) => {
            state.savedBeach.push(action.payload);
        },
        removeSavedBeach: (state, action) => {
            console.log('action.payload:', action.payload);
        
            const beachIdToRemove = action.payload;
            const indexToRemove = state.savedBeach.indexOf(beachIdToRemove);
        
            if (indexToRemove !== -1) {
                state.savedBeach.splice(indexToRemove, 1);
            }
        
            console.log('state.savedBeach dopo la rimozione:', state.savedBeach);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(createUser.rejected, (state) => {
                state.isLoading = false;
                state.error = 'Registration failed'
            })
            .addCase(getUserById.pending,(state) => {
                state.isLoading = true;
             })
            .addCase(getUserById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userById = action.payload;
            })
            .addCase(getUserById.rejected, (state) => {
                state.isLoading = false;
                state.error = 'Registration failed'
            })
            .addCase(addSavedBeach, (state, action) => {
                state.savedBeach.push(action.payload); 
            })
            .addCase(removeSavedBeach, (state, action) => {
                state.savedBeach = state.savedBeach.filter(
                    (beach) => beach._id !== action.payload
                );
            });
    }
})

export const allUser = (state) => state.userState.user;
export const isUserLoading = (state) => state.userState.isLoading;
export const userError = (state) => state.userState.error;
export const savedBeaches = (state) => state.userState.savedBeach;
export const { addSavedBeach, removeSavedBeach } = UserSlice.actions;

export default UserSlice.reducer;