import useAuth from "@/hooks/useAuth";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function AuthLayout() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <React.Suspense fallback={null}>
      <Outlet />
    </React.Suspense>
  );
}

export default AuthLayout;
