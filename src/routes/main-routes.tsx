import PrivateRoute from "@/components/PrivateRoute";
import MainLayout from "@/layouts/MainLayout";
import type { RouteObject } from "react-router-dom";

export const mainRoutes: RouteObject = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      element: <PrivateRoute />,
      children: [
        {
          path: "/",
          element: <h1>Home</h1>,
        },
      ],
    },
  ],
};
