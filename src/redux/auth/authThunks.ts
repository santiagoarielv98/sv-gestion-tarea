import { createAsyncThunk } from "@reduxjs/toolkit"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth"
import { addDoc, collection } from "firebase/firestore"
import { auth, db } from "../../firebase"

export const login = createAsyncThunk(
  "auth/login",
  async (user: { email: string; password: string }) => {
    if (auth.currentUser) {
      return auth.currentUser
    }

    const response = await signInWithEmailAndPassword(
      auth,
      user.email,
      user.password,
    )
    return response.user
  },
)

export const register = createAsyncThunk(
  "auth/register",
  async (user: { email: string; password: string }) => {
    if (auth.currentUser) {
      return auth.currentUser
    }
    const response = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password,
    )
    await addDoc(collection(db, "users"), {
      email: user.email,
      uid: response.user.uid,
    })

    return response.user
  },
)

export const logout = createAsyncThunk("auth/logout", async () => {
  await auth.signOut()
})
