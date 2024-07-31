import { RouterProvider } from "react-router-dom"

import { onAuthStateChanged } from "firebase/auth"
import React from "react"
import { auth } from "./firebase"
import { setUser } from "./redux/auth/authSlice"
import { useAppDispatch } from "./redux/hooks"
import { routes } from "./routes"

const App = () => {
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      console.log("entrando...")
      if (user) {
        dispatch(setUser({ id: user.uid, email: user.email! }))
      } else {
        dispatch(setUser(null))
      }
    })

    return () => {
      unsubscribe()
    }
  }, [dispatch])

  return <RouterProvider router={routes} />
}

export default App
