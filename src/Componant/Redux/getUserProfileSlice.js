import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserProfile = createAsyncThunk(
  'userProfile/fetchUserProfile',
  async (customerId, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/getUserInfo/${customerId}`,
        { headers: { Authorization: localStorage.getItem('authToken') } }
      );
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to load user profile');
    }
  }
);

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState: {
    profile: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default userProfileSlice.reducer;
