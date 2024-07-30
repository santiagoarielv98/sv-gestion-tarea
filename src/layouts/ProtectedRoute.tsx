import type { User } from "firebase/auth"
import React from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { auth } from "../firebase"

export default function ProtectedRoute() {
  const [user, setUser] = React.useState<User | null>(null)
  const navigate = useNavigate()

  React.useEffect(() => {
    const unsub = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user)
      } else {
        navigate("/login")
        setUser(null)
      }
    })
    return () => {
      unsub()
    }
  }, [navigate])

  React.useEffect(() => {
    console.log("User", user)
  }, [user])

  return <Outlet />
}
