import { createBrowserRouter } from "react-router-dom"
import { authRoutes } from "./auth-routes"
import { mainRoutes } from "./main-routes"

export const routes = createBrowserRouter([mainRoutes, authRoutes])
