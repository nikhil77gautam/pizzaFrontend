import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  getMeals: [],
  message: "",
  loading: false,
  error: null,
};

export const getmeals = createAsyncThunk(
  "getmeals", 
  async () => {
    try {
      const response = await axios.get("https://pizzabackend-0x3r.onrender.com/readAllmeals");
      console.log("response", response);
      return response.data;
    } catch (error) {
      return { Error: error.message };
    }
  }
);

const getMeals_Slice = createSlice({
  name: "getMeals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getmeals.pending, (state) => {
        state.loading = true;
      })
      .addCase(getmeals.fulfilled, (state, action) => {
        state.loading = false;
        state.getMeals = action.payload; 
        state.message = "success";
      })
      .addCase(getmeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default getMeals_Slice.reducer;
