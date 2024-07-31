import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { auth, db } from "../../firebase"

interface IUser {
  id: string
  email: string
}

interface ICredentials {
  email: string
  password: string
}

interface AuthState {
  user: IUser | null
  loading: boolean
}

const initialState: AuthState = {
  user: null,
  loading: false,
}

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (user: ICredentials, { rejectWithValue }) => {
    if (auth.currentUser) return true
    try {
      await signInWithEmailAndPassword(auth, user.email, user.password)
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (user: ICredentials, { rejectWithValue }) => {
    if (auth.currentUser) return true
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password,
      )
      await setDoc(doc(db, "users", response.user.uid), {
        email: response.user.email,
      })
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const signOutUser = createAsyncThunk(
  "auth/signOut",
  async (_, { rejectWithValue }) => {
    if (!auth.currentUser) return true
    try {
      await signOut(auth)
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

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

/* export async function authenticateUser(user: User | null, dispatch: Dispatch) {
  if (user) {
    // const userDoc = await getDoc(doc(db, "users", user.uid))

    // if (userDoc.exists()) {
    dispatch(setUser({ id: user.uid, email: user.email! }))
    // }
  }
  dispatch(setLoading(false))
} */
