import ProtectedRoute from "../features/app/components/ProtectedRoute";
import ResponsiveDrawer from "../features/app/components/ResponsiveLayout";

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
