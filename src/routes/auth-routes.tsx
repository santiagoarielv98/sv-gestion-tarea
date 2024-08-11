import AuthLayout from "@/layouts/AuthLayout";
import React from "react";
import { type RouteObject } from "react-router-dom";

export const authRoutes: RouteObject = {
  element: <AuthLayout />,
  path: "auth",
  children: [
    {
      // element: <SignInPage />,
      path: "sign-in",
      Component: React.lazy(() => import("@/features/auth/SignIn")),
    },
  ],
};
