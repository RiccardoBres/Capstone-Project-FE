import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    schools: [],
    isLoading : false,
    error: null,
}

export const getSchools = createAsyncThunk(
    "schools/getSchools",
    async ()=>{
        try {
            const data = await fetch("http://localhost:9090/school");
            const response = await data.json();
            const schools = response;
            return schools
        } catch (error) {
            console.log(error)
        }
    }
)

const schoolSlice = createSlice({
    name: 'schoolState',
    initialState,
    extraReducers: (builder)=>{
        builder
        .addCase(getSchools.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getSchools.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.schools = action.payload.schools;
        })
        .addCase(getSchools.rejected, (state)=>{
            state.isLoading = false;
            state.error = "Not possible find schools"
        })
    }
})

export const allSchools = (state) => state.schoolState.schools;
export const isLoading = (state) => state.schoolState.isLoading;
export const schoolsError = (state) => state.schoolState.error;

export default schoolSlice.reducer;
