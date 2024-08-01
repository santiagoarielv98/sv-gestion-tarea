import { createAsyncThunk } from "@reduxjs/toolkit"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { auth, db } from "../../firebase"

export interface ICredentials {
  email: string
  password: string
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
