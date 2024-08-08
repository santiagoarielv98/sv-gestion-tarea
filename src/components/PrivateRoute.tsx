import useAuth from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth/sign-in" />;
  }

  return <Outlet />;
}

export default PrivateRoute;
