import { createBrowserRouter, Navigate } from "react-router-dom";

import { authRoutes } from "./auth-routes";
import { mainRoutes } from "./main-routes";

export const routes = createBrowserRouter([
  authRoutes,
  mainRoutes,
  {
    path: "*",
    element: <Navigate to="/auth/sign-in" />,
  },
]);
