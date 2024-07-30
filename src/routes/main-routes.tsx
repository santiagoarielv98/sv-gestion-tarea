import type { RouteObject } from "react-router-dom"
import AppLayout from "../layouts/AppLayout"
import ProtectedRoute from "../layouts/ProtectedRoute"
import Home from "../pages/Home/Home"

export const mainRoutes: RouteObject = {
  path: "/",
  element: <ProtectedRoute />,
  children: [
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
      ],
    },
  ],
}
