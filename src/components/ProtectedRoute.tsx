import { Navigate, Outlet } from "react-router-dom";
import { selectUser } from "../features/auth/authSlice";
import { useAppSelector } from "../hooks/store";

function ProtectedRoute() {
  const user = useAppSelector(selectUser);

  if (!user) {
    return <Navigate to="/auth/sign-in" />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
