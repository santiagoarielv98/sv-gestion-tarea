import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "@/users/pages/login";
import PrivateRoute from "./private-route";
import AuthRoute from "./auth-route";
import React from "react";

const Tasks = React.lazy(() => import("@/tasks/pages/Tasks"));

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <PrivateRoute />,
      children: [
        {
          index: true,
          element: <Tasks />,
        },
      ],
    },
    {
      path: "/",
      element: <AuthRoute />,
      children: [
        {
          path: "login",
          element: <LoginPage />,
        },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);
