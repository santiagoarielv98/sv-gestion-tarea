import type { RouteObject } from "react-router-dom";
import HomePage from "../pages/Home";
import ProtectedLayout from "../layouts/ProtectedLayout";

export const mainRoutes: RouteObject = {
  path: "/",
  element: <ProtectedLayout />,
  children: [
    {
      path: "/",
      element: <HomePage />,
    },
  ],
};
