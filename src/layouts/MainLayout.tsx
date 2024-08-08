import ProtectedRoute from "../components/ProtectedRoute";
import ResponsiveDrawer from "../components/ResponsiveLayout";

function MainLayout() {
  return (
    <>
      <ProtectedRoute>
        <ResponsiveDrawer />
      </ProtectedRoute>
    </>
  );
}

export default MainLayout;
