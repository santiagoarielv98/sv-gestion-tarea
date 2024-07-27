import type { RouteObject } from "react-router-dom"
import AppLayout from "../layouts/AppLayout"
import Home from "../pages/Home/Home"

export const mainRoutes: RouteObject = {
  path: "/",
  element: <AppLayout />,
  children: [
    {
      path: "/",
      element: <Home />,
    },
  ],
}
