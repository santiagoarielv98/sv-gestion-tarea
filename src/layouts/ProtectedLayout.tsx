import { Navigate, Outlet } from "react-router-dom";
import { selectUser } from "../features/auth/authSlice";
import { useAppSelector } from "../redux/hooks";

function ProtectedLayout() {
  const user = useAppSelector(selectUser);

  if (!user) {
    return <Navigate to="/auth/sign-in" />;
  }

  return <Outlet />;
}

export default ProtectedLayout;
