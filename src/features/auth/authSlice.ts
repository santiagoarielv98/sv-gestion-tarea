import { createSlice } from '@reduxjs/toolkit';
import { authApi } from './authApi';
import type { User } from './types/auth';

export interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.check.matchFulfilled, (state, action) => {
      state.user = { displayName: action.payload.name, email: action.payload.email };
    });
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addMatcher(authApi.endpoints.register.matchFulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
      state.user = null;
      localStorage.removeItem('user');
    });
  },
  selectors: {
    selectUser: (state) => state.user
  }
});

export const { selectUser } = authSlice.selectors;

export default authSlice.reducer;
