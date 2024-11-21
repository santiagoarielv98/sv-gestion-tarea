import { useAuth } from "@/hooks/use-auth";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { user, isLoading } = useAuth();

  if (!user && !isLoading) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
