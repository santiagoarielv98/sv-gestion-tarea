import { Outlet, type RouteObject } from "react-router-dom"
import SignIn from "../pages/SignIn/SignIn"

export const authRoutes: RouteObject = {
  path: "/",
  element: <Outlet />,
  children: [
    {
      path: "/login",
      element: <SignIn />,
    },
  ],
}
