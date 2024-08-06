import { Outlet, type RouteObject } from "react-router-dom";
import SignInSide from "../pages/SignIn";

export const authRoutes: RouteObject = {
  element: <Outlet />,
  path: "/auth",
  children: [
    {
      element: <SignInSide />,
      path: "sign-in",
    },
  ],
};
