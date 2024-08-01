import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { signIn, signOutUser, signUp } from "./authThunk"

export interface IUser {
  id: string
  email: string
}

export interface AuthState {
  user: IUser | null
  loading: boolean
}

const initialState: AuthState = {
  user: null,
  loading: false,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signIn.pending, state => {
        state.loading = true
      })
      .addCase(signIn.fulfilled, (state, action) => {
        if (!action.payload) return
        state.loading = false
      })
      .addCase(signIn.rejected, state => {
        state.loading = false
      })
      .addCase(signUp.pending, state => {
        state.loading = true
      })
      .addCase(signUp.fulfilled, (state, action) => {
        if (!action.payload) return
        state.loading = false
      })
      .addCase(signUp.rejected, state => {
        state.loading = false
      })
      .addCase(signOutUser.pending, state => {
        state.loading = true
      })
      .addCase(signOutUser.fulfilled, (state, action) => {
        if (!action.payload) return
        state.loading = false
      })
      .addCase(signOutUser.rejected, state => {
        state.loading = false
      })
  },
  selectors: {
    selectUserState: state => state,
  },
})

export const { setUser, setLoading } = authSlice.actions

export const { selectUserState } = authSlice.selectors
