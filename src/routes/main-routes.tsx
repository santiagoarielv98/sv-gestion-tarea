import type { RouteObject } from "react-router-dom";

import PrivateRoute from "@/components/PrivateRoute";
import Today from "@/features/tasks/Today";
import MainLayout from "@/layouts/MainLayout";

export const mainRoutes: RouteObject = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      element: <PrivateRoute />,
      children: [
        {
          path: "/",
          element: <Today />,
        },
      ],
    },
  ],
};
