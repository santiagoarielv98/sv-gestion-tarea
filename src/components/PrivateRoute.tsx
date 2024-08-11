import { Navigate, Outlet } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

function PrivateRoute() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth/sign-in" />;
  }

  return <Outlet />;
}

export default PrivateRoute;
