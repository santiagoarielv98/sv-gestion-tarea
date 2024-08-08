import { Outlet } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

function MainLayout() {
  return (
    <ProtectedRoute>
      <Outlet />
    </ProtectedRoute>
  );
}

export default MainLayout;
