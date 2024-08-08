import { Navigate } from "react-router-dom";
import { selectUser } from "../features/auth/authSlice";
import { useAppSelector } from "../redux/hooks";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute(props: ProtectedRouteProps) {
  const { children } = props;
  const user = useAppSelector(selectUser);

  if (!user) {
    return <Navigate to="/auth/sign-in" />;
  }

  return children;
}

export default ProtectedRoute;
