import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userOrders: [],
  message: "",
  loading: false,
  error: null,
};

export const getOrderUsers = createAsyncThunk("/getOrder", async () => {
  const customerId = localStorage.getItem("customerId");
  try {
    const response = await axios.get(`https://pizzabackend-0x3r.onrender.com/getOrder/${customerId}`);
    return response.data;
  } catch (error) {
    return { Error: error.message };
  }
});

const getOrderUser_Slice = createSlice({
  name: "userOrders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.userOrders = action.payload;
        state.message = "success";
      })
      .addCase(getOrderUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default getOrderUser_Slice.reducer;
