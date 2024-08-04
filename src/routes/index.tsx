import React from "react"
import { createBrowserRouter } from "react-router-dom"

const Home = React.lazy(() => import("../pages/Home/Home"))

export const routes = createBrowserRouter([
  {
    path: "",
    element: <Home />,
  },
])
