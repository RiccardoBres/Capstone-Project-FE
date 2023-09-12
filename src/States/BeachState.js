import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    beach: [],
    comment: [],
    error: null
}

export const getBeach = createAsyncThunk(
    'beach/getBeach',
    async () => {
        try {
            const data = await fetch('http://localhost:9090/beach');
            const response = data.json();
            return response

        } catch (error) {
            console.log(error);
        }
    }
)

export const getComment = createAsyncThunk(
    'comment/getComment',
    async (beachId) => {
        try {
            const data = await fetch(`http://localhost:9090/beach/${beachId}/comments`);
            const response = data.json();
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
    name: 'BeachState',
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
    }
});



export const allBeach = (state) => state.beachState.beach;
export const allComment = (state) => state.beachState.comment;
export const isLoading = (state) => state.beachState.isLoading;
export const beachError = (state) => state.beachState.error;

export default beachSlice.reducer;