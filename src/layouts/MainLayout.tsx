import { Outlet } from "react-router-dom";
import Header from "../features/app/components/Header";
import ProtectedRoute from "../features/app/components/ProtectedRoute";

function MainLayout() {
  return (
    <>
      <Header />
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    </>
  );
}

export default MainLayout;
