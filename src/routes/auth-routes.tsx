import { type RouteObject } from "react-router-dom";
import SignInPage from "../features/auth/SignIn";
import AuthLayout from "../layouts/AuthLayout";

export const authRoutes: RouteObject = {
  element: <AuthLayout />,
  path: "auth",
  children: [
    {
      element: <SignInPage />,
      path: "sign-in",
    },
  ],
};
