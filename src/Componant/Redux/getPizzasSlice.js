import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  homePizzas: [],
  message: "",
  loading: false,
  error: null,
};

export const getPizzas = createAsyncThunk("/getPizzas", async () => {
  try {
    const response = await axios.get(
      "https://pizzabackend-0x3r.onrender.com/readallpizzas"
    );
    console.log("response", response);

    return response.data;
  } catch (error) {
    return { Error: error.message };
  }
});

const getPizzas_Slice = createSlice({
  name: "homePizzas",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPizzas.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(getPizzas.fulfilled, (state, action) => {
        state.loading = false;
        state.homePizzas = action.payload;
        state.message = "success";
      })

      .addCase(getPizzas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export default getPizzas_Slice.reducer;
