import type { RouteObject } from "react-router-dom";

import PrivateRoute from "@/components/PrivateRoute";
import MainLayout from "@/layouts/MainLayout";

import CompletedPage from "@/features/tasks/Completed";
import InboxPage from "@/features/tasks/Inbox";
import TodayPage from "@/features/tasks/Today";
import UpcomingPage from "@/features/tasks/Upcoming";

export const mainRoutes: RouteObject = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      element: <PrivateRoute />,
      children: [
        {
          index: true,
          element: <TodayPage />,
        },
        {
          path: "upcoming",
          element: <UpcomingPage />,
        },
        {
          path: "inbox",
          element: <InboxPage />,
        },
        {
          path: "completed",
          element: <CompletedPage />,
        },
      ],
    },
  ],
};
