import { Navigate, Outlet } from "react-router-dom";
import { selectUser } from "../features/auth/authSlice";
import { useAppSelector } from "../hooks/store";

function AuthLayout() {
  const user = useAppSelector(selectUser);

  if (user) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}

export default AuthLayout;
