import { useAuth } from "@/hooks/use-auth";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { user, isLoading } = useAuth();

  if (!user && !isLoading) {
    return <Navigate to="/login" />;
  }

  return <React.Suspense fallback={null}>{<Outlet />}</React.Suspense>;
};

export default PrivateRoute;
