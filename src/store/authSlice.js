import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials) => {
    const response = await api.login(credentials);
    if (response.status === 'success') {
      localStorage.setItem('token', response.data.token);
      return response.data.token;
    }
    throw new Error(response.message);
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData) => {
    const response = await api.register(userData);
    if (response.status === 'success') {
      return response.data.user;
    }
    throw new Error(response.message);
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token'),
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem('token');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;