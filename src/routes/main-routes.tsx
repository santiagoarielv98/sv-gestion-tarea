import type { RouteObject } from "react-router-dom";
import HomePage from "../features/app/Home";
import MainLayout from "../layouts/MainLayout";

export const mainRoutes: RouteObject = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <HomePage />,
    },
  ],
};
