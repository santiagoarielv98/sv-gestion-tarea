import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { type User } from "firebase/auth"
import { login, logout, register } from "./authThunks"

export type AuthState = {
  user: User | null
  status: "idle" | "loading" | "succeeded" | "failed"
}

const initialState: AuthState = {
  user: null,
  status: "idle",
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(login.pending, state => {
      state.status = "loading"
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = "succeeded"
      state.user = action.payload
    })
    builder.addCase(login.rejected, state => {
      state.status = "failed"
    })
    builder.addCase(register.pending, state => {
      state.status = "loading"
    })
    builder.addCase(register.fulfilled, (state, action) => {
      state.status = "succeeded"
      state.user = action.payload
    })
    builder.addCase(register.rejected, state => {
      state.status = "failed"
    })

    builder.addCase(logout.pending, state => {
      state.status = "loading"
    })
    builder.addCase(logout.fulfilled, state => {
      state.status = "succeeded"
      state.user = null
    })
    builder.addCase(logout.rejected, state => {
      state.status = "failed"
    })
  },
  selectors: {
    selectUser: state => state.user,
    selectIsLoggedIn: state => state.user !== null,
  },
})

export const { setUser } = authSlice.actions

export const { selectUser, selectIsLoggedIn } = authSlice.selectors
