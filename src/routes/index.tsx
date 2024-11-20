import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "@/users/pages/login";
import Tasks from "@/tasks/pages/Tasks";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Tasks />,
  },
  {
    path: "login",
    element: <LoginPage />,
  },
]);
