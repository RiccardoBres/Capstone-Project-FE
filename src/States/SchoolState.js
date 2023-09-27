import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    schools: [],
    isLoading: false,
    error: null,
    schoolsByLocation: [],
    schoolDetails:[],
}

export const getSchools = createAsyncThunk(
    "schools/getSchools",
    async () => {
        try {
            const data = await fetch("http://localhost:9090/school");
            const response = await data.json();
            return response
        } catch (error) {
            console.error('Errore nella chiamata API:', error);
            throw error;        }
    }
)
export const getSchoolsByLocation = createAsyncThunk(
    'schools/getSchoolsByLocation',
    async (location) => {
        try {
            const response = await fetch(`http://localhost:9090/school/location?location=${location}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Errore nella chiamata API:', error);
            throw error;
        }
    }
);

export const getSchoolsById = createAsyncThunk(
    'school/schoolById',
    async (id) => {
        try {
            const response = await fetch(`http://localhost:9090/school/${id}`);
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error('Errore nella chiamata API:', error);
            throw error;
        }
    }
)

export const createSchool = createAsyncThunk(
    "School/createSchool",
    async (school) => {
        const form = new FormData()
        form.append("name", school.name);
        form.append("address", school.address);
        form.append("location", school.location);
        form.append("image", school.image);
        form.append("description", school.description);
        form.append("email", school.email);
        form.append("password", school.password);
        console.log(...form);

        try {
            const res = await axios.post('http://localhost:9090/school/create', form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
            console.log(res);
            return res.data;

        } catch (error) {
            console.log(error)
        }
    }
);

const schoolSlice = createSlice({
    name: 'schoolState',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getSchools.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSchools.fulfilled, (state, action) => {
                state.isLoading = false;
                state.schools = action.payload.schools;
            })
            .addCase(getSchools.rejected, (state) => {
                state.isLoading = false;
                state.error = "Not possible find schools";
            })
            .addCase(createSchool.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createSchool.fulfilled, (state, action) => {
                state.isLoading = false;
                state.schools = action.payload;
            })
            .addCase(createSchool.rejected, (state) => {
                state.isLoading = false;
                state.error = "Not possible create schools"
            })
            .addCase(getSchoolsByLocation.fulfilled, (state, action) => {
                state.isLoading = false;
                state.schoolsByLocation = action.payload
            })
            .addCase(getSchoolsById.fulfilled, (state,action)=>{
                state.isLoading = false;
                state.schoolDetails = action.payload
            })
    }
})

export const allSchools = (state) => state.schoolState.schools;
export const schoolsByLocation = (state) => state.schoolState.schoolsByLocation;
export const schoolDetails = (state) => state.schoolState.schoolDetails;
export const isLoading = (state) => state.schoolState.isLoading;
export const schoolsError = (state) => state.schoolState.error;

export default schoolSlice.reducer;
