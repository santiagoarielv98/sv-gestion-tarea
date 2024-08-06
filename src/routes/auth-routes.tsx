import { type RouteObject } from "react-router-dom";
import SignInPage from "../pages/SignIn";
import AuthLayout from "../layouts/AuthLayout";

export const authRoutes: RouteObject = {
  element: <AuthLayout />,
  path: "/auth",
  children: [
    {
      element: <SignInPage />,
      path: "sign-in",
    },
  ],
};
