import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const fetchThreads = createAsyncThunk(
  'threads/fetchThreads',
  async () => {
    const response = await api.getThreads();
    if (response.status === 'success') {
      return response.data.threads;
    }
    throw new Error(response.message);
  }
);

export const fetchThreadDetail = createAsyncThunk(
  'threads/fetchThreadDetail',
  async (threadId) => {
    const response = await api.getThreadDetail(threadId);
    if (response.status === 'success') {
      return response.data.detailThread;
    }
    throw new Error(response.message);
  }
);

export const createThread = createAsyncThunk(
  'threads/createThread',
  async ({ threadData, token }) => {
    const response = await api.createThread(threadData, token);
    if (response.status === 'success') {
      return response.data.thread;
    }
    throw new Error(response.message);
  }
);

export const createComment = createAsyncThunk(
  'threads/createComment',
  async ({ threadId, content, token }) => {
    const response = await api.createComment(threadId, content, token);
    if (response.status === 'success') {
      return response.data.comment;
    }
    throw new Error(response.message);
  }
);

const threadsSlice = createSlice({
  name: 'threads',
  initialState: {
    threads: [],
    currentThread: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchThreads.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchThreads.fulfilled, (state, action) => {
        state.isLoading = false;
        state.threads = action.payload;
      })
      .addCase(fetchThreads.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchThreadDetail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchThreadDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentThread = action.payload;
      })
      .addCase(fetchThreadDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(createThread.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createThread.fulfilled, (state, action) => {
        state.isLoading = false;
        state.threads.unshift(action.payload);
      })
      .addCase(createThread.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(createComment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.currentThread) {
          state.currentThread.comments.push(action.payload);
        }
      })
      .addCase(createComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearError } = threadsSlice.actions;
export default threadsSlice.reducer;