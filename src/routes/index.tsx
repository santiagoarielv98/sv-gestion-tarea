import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "@/users/pages/login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "login",
    element: <LoginPage />,
  },
]);
