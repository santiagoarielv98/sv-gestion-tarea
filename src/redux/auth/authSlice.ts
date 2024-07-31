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
import {
  addDoc,
  collection,
  doc,
  type FirestoreDataConverter,
  getDoc,
} from "firebase/firestore"
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

export class User {
  constructor(
    public id: string,
    public email: string,
  ) {}
}

const userConverter: FirestoreDataConverter<User> = {
  toFirestore(user: User): User {
    return {
      id: user.id,
      email: user.email,
    }
  },
  fromFirestore(snapshot, options): User {
    const data = snapshot.data(options)
    return new User(data.id, data.email)
  },
}

const initialState: AuthState = {
  user: null,
  loading: false,
}

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (user: ICredentials, { rejectWithValue }) => {
    if (auth.currentUser) {
      return {
        id: auth.currentUser.uid,
        email: auth.currentUser.email!,
      }
    }
    try {
      const authResponse = await signInWithEmailAndPassword(
        auth,
        user.email,
        user.password,
      )

      const userDoc = await getDoc(
        doc(db, "users", authResponse.user.uid).withConverter(userConverter),
      )

      return userDoc.data() ?? null
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (user: ICredentials, { rejectWithValue }) => {
    if (auth.currentUser) {
      return {
        id: auth.currentUser.uid,
        email: auth.currentUser.email!,
      }
    }
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password,
      )
      console.log("res", response)
      const newUserDoc = await addDoc(
        collection(db, "users").withConverter(userConverter),
        {
          id: response.user.uid,
          email: response.user.email,
        },
      )
      console.log("newUserDoc", newUserDoc)
      return {
        id: response.user.uid,
        email: response.user.email!,
      }
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const signOutUser = createAsyncThunk(
  "auth/signOut",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth)
      return null
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
      console.log(action)
      state.user = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signIn.pending, state => {
        state.loading = true
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.user = action.payload
        state.loading = false
      })
      .addCase(signIn.rejected, state => {
        state.loading = false
      })
      .addCase(signUp.pending, state => {
        state.loading = true
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload
        state.loading = false
      })
      .addCase(signUp.rejected, state => {
        state.loading = false
      })
      .addCase(signOutUser.pending, state => {
        state.loading = true
      })
      .addCase(signOutUser.fulfilled, state => {
        state.user = null
        state.loading = false
      })
      .addCase(signOutUser.rejected, state => {
        state.loading = false
      })
  },
  selectors: {
    selectUser: state => state.user,
    selectLoading: state => state.loading,
  },
})

export const { setUser } = authSlice.actions

export const { selectUser, selectLoading } = authSlice.selectors
