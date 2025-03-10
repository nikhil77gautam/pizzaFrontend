import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userCart: { pizzas: [], meals: [], totalAmount: 0 }, 
  message: "",
  loading: false,
  error: null,
};

export const getUserCart = createAsyncThunk("userCart/getCart", async () => {
  const customerId = localStorage.getItem("customerId");
  const token = localStorage.getItem("authToken");
  try {
    const response = await axios.get(`http://localhost:8000/getcartpizza/${customerId}`, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error.message); 
  }
});

const getUserCart_Slice = createSlice({
  name: "userCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.loading = false;
        state.userCart = action.payload;
        state.message = "success";
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch cart";
      });
  },
});

export default getUserCart_Slice.reducer;
