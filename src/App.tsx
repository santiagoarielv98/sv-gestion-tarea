import { RouterProvider } from "react-router-dom"

import { onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import React from "react"
import { auth, db } from "./firebase"
import { setLoading, setUser } from "./redux/auth/authSlice"
import { useAppDispatch } from "./redux/hooks"
import { routes } from "./routes"

function App() {
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    dispatch(setLoading(true))
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid))
        console.log("user 1", userDoc.data())
        if (userDoc.exists()) {
          dispatch(setUser({ id: user.uid, email: user.email! }))
        } else {
          dispatch(setUser(null))
        }
      } else {
        dispatch(setUser(null))
      }
      console.log("user 2")

      dispatch(setLoading(false))
    })

    return () => {
      unsubscribe()
    }
  }, [dispatch])

  return <RouterProvider router={routes} />
}

export default App
