import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "@/users/pages/login";
import PrivateRoute from "./private-route";
import AuthRoute from "./auth-route";
import React from "react";
import { RegisterPage } from "@/users/pages/register";

const MainLayout = React.lazy(() => import("@/layouts/main-layout"));
const Tasks = React.lazy(() => import("@/tasks/pages/Tasks"));
const Tags = React.lazy(() => import("@/tags/pages/Tags"));

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <PrivateRoute />,
      children: [
        {
          path: "/",
          element: <MainLayout />,
          children: [
            {
              index: true,
              element: <Tasks />,
            },
            },
          ],
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
        {
          path: "register",
          element: <RegisterPage />,
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
