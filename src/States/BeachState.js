import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    beach: [],
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
                state.beach = action.payload.beach;
            })
            .addCase(getBeach.rejected, (state) => {
                state.isLoading = false;
                state.error = "Not possible find schools";
            });
    }
});


export const allBeach = (state) => state.beachState.beach;
export const isLoading = (state) => state.beachState.isLoading;
export const beachError = (state) => state.beachState.error;

export default beachSlice.reducer;