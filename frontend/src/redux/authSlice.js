// src/redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Define the initial state for login and user profile
const initialState = {
  isLoggedIn: false,
  token: null,
  userProfile: null,
  error: '',
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = '';
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.userProfile = action.payload.userProfile;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.token = null;
      state.userProfile = null;
      state.error = '';
      state.loading = false;
    },
  },
});

// Export actions for use in components
export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

// Export the reducer to be used in the store
export default authSlice.reducer;
