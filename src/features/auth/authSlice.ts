import { createSlice } from "@reduxjs/toolkit";
import { api } from "../api/apiSlice";
import type { RootState } from "../../redux/store";

interface User {
  email: string;
}

interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.login.matchFulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addMatcher(
        api.endpoints.verifySession.matchFulfilled,
        (state, action) => {
          state.user = action.payload;
        }
      );
  },
});

export default authSlice.reducer;

export const { logout } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;
