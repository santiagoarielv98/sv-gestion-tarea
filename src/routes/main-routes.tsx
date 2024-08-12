import React from "react";
import type { RouteObject } from "react-router-dom";

export const mainRoutes: RouteObject = {
  path: "/",
  Component: React.lazy(() => import("@/layouts/MainLayout")),
  children: [
    {
      Component: React.lazy(() => import("@/components/PrivateRoute")),
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
