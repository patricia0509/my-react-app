import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import threadsSlice from './threadsSlice';
import usersSlice from './usersSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    threads: threadsSlice,
    users: usersSlice,
  },
});

export default store;