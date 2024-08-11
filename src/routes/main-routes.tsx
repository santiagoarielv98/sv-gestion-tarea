import React from "react";
import type { RouteObject } from "react-router-dom";

import PrivateRoute from "@/components/PrivateRoute";
import MainLayout from "@/layouts/MainLayout";

export const mainRoutes: RouteObject = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      element: <PrivateRoute />,
      children: [
        {
          index: true,
          Component: React.lazy(() => import("@/features/tasks/Today")),
        },
        {
          path: "upcoming",
          Component: React.lazy(() => import("@/features/tasks/Upcoming")),
        },
        {
          path: "inbox",
          Component: React.lazy(() => import("@/features/tasks/Inbox")),
        },
        {
          path: "completed",
          Component: React.lazy(() => import("@/features/tasks/Completed")),
        },
      ],
    },
  ],
};
