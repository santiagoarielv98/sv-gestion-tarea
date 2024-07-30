import { Navigate, Outlet } from "react-router-dom"
import { selectStatus, selectUser } from "../redux/auth/authSlice"
import { useAppSelector } from "../redux/hooks"

export default function ProtectedRoute() {
  const user = useAppSelector(selectUser)
  const status = useAppSelector(selectStatus)
  
  if (["loading", "idle"].includes(status)) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  return <Outlet />
}
