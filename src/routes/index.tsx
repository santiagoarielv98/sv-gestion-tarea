import { LoginPage } from "@/users/pages/login";
import { RegisterPage } from "@/users/pages/register";
import { createBrowserRouter } from "react-router-dom";
import AuthRoute from "./auth-route";
import PrivateRoute from "./private-route";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <PrivateRoute />,
      children: [
        {
          path: "/",
          // element: <MainLayout />,
          lazy: async () => ({
            Component: (await import("@/layouts/main-layout")).default,
          }),
          children: [
            {
              index: true,
              lazy: async () => ({
                Component: (await import("@/tasks/pages/Tasks")).default,
              }),
            },
            {
              path: "tags",
              lazy: async () => ({
                Component: (await import("@/tags/pages/Tags")).default,
              }),
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
