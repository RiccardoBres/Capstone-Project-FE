import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    isLoading: false,
    beach: [],
    comment: [],
    error: null,
}
export const getBeach = createAsyncThunk(
    'beach/getBeach',
    async () => {
        try {
            const data = await fetch('http://localhost:9090/beach');
            const response = await data.json();
            return response;
        } catch (error) {
            console.error(error);
            throw error; 
        }
    }
)
export const postBeach = createAsyncThunk(
    'beach/postBeach',
    async (payload) => {
        const token = JSON.parse(localStorage.getItem("userLoggedIn"));
        const form = new FormData()
        form.append("name", payload.name);
        form.append("location", payload.location);
        form.append("type", payload.type);
        form.append("level", payload.level);
        form.append("image", payload.image);
        form.append("user", payload.user);
        console.log(form);

        try {
            const res = await axios.post('http://localhost:9090/beach/create', form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': token
                }
            })
            console.log(res);
            return res.data;

        } catch (error) {
            console.log(error)
        }
    }
)


export const getComment = createAsyncThunk(
    'comment/getComment',
    async (beachId) => {
        try {
            const data = await fetch(`HTTP://localhost:9090/beach/${beachId}/comments`);
            const response = await data.json();
            return response
        } catch (error) {
            console.log(error);
        }
    }
)


export const createComment = createAsyncThunk(
    'comment/createComment',
    async ({ content, beachId }) => {
        try {
            const token = JSON.parse(localStorage.getItem("userLoggedIn"));
            const response = await fetch(`http://localhost:9090/beach/${beachId}/comment`, {
                method: 'POST',
                body: JSON.stringify({ content }),
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Errore nella richiesta di creazione del commento');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error("Impossibile creare il commento");
        }
    }
);
export const deleteComment = createAsyncThunk(
    'comment/deleteComment',
    async (commentID) => {
        try {
            const token = JSON.parse(localStorage.getItem('userLoggedIn'));
            const response = await fetch(`http://localhost:9090/comment/${commentID}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': token,
                },
            });
        } catch (error) {
            console.log(error);
        }
    }
);


export const beachSlice = createSlice({
    name: 'beachState',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getBeach.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBeach.fulfilled, (state, action) => {
                state.isLoading = false;
                state.beach = action.payload.beaches;
            })
            .addCase(getBeach.rejected, (state) => {
                state.isLoading = false;
                state.error = "Not possible find schools";
            })
            .addCase(getComment.fulfilled, (state, action) => {
                state.isLoading = true;
                state.comment = action.payload;
            })
            .addCase(postBeach.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(postBeach.fulfilled, (state, action) => {
                state.isLoading = false;
                state.beach = action.payload;
            })
            .addCase(postBeach.rejected, (state) => {
                state.isLoading = false;
                state.error = "Not possible find schools";
            })
    }
});



export const allBeach = (state) => state.beachState.beach;
export const allComment = (state) => state.beachState.comment;
export const isLoading = (state) => state.beachState.isLoading;
export const beachError = (state) => state.beachState.error;


export default beachSlice.reducer;