import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

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
export const getSchoolsByLocation = createAsyncThunk(
    "schools/getSchoolsByLocation",
    async (location) => {
      try {
        const data = await fetch(`http://localhost:9090/school/location?location=${location}`);
        const response = await data.json();
        const schools = response;
        return schools;
      } catch (error) {
        console.log(error);
      }
    }
  );
  
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
            state.error = "Not possible find schools";
        })
        .addCase(createSchool.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(createSchool.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.schools = action.payload;
        })
        .addCase(createSchool.rejected, (state)=>{
            state.isLoading = false;
            state.error = "Not possible create schools"
        })
    }
})

export const allSchools = (state) => state.schoolState.schools;
export const isLoading = (state) => state.schoolState.isLoading;
export const schoolsError = (state) => state.schoolState.error;

export default schoolSlice.reducer;
