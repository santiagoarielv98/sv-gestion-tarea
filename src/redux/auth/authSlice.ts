import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { login, logout, register } from "./authThunks"

export type User = {
  uid: string
  email: string
}

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
    setStatus: (
      state,
      action: PayloadAction<"idle" | "loading" | "succeeded" | "failed">,
    ) => {
      state.status = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(login.pending, state => {
      state.status = "loading"
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = "succeeded"
      state.user = {
        uid: action.payload.uid,
        email: action.payload.email!,
      }
    })
    builder.addCase(login.rejected, state => {
      state.status = "failed"
    })
    builder.addCase(register.pending, state => {
      state.status = "loading"
    })
    builder.addCase(register.fulfilled, (state, action) => {
      state.status = "succeeded"
      state.user = {
        uid: action.payload.uid,
        email: action.payload.email!,
      }
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
    selectStatus: state => state.status,
  },
})

export const { setUser, setStatus } = authSlice.actions

export const { selectUser, selectIsLoggedIn, selectStatus } =
  authSlice.selectors
