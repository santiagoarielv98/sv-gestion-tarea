import useAuth from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

function AuthLayout() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}

export default AuthLayout;
