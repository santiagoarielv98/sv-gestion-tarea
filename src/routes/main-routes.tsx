import type { RouteObject } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";

export const mainRoutes: RouteObject = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      index: true,
      element: <h1>Home</h1>,
    },
  ],
};
