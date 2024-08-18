import { lazy } from 'react';

// project import
import Loadable from '@/components/Loadable';
import { Navigate } from 'react-router';
import PrivateRoutes from './PrivateRoutes';

// import Dashboard from '@/layout/Dashboard';

const MainLayout = Loadable(lazy(() => import('@/layout/MainLayout')));
const Dashboard = Loadable(lazy(() => import('@/pages/dashboard/index')));

const MainRoutes = {
  path: '/',
  element: (
    <PrivateRoutes>
      <MainLayout />
    </PrivateRoutes>
  ),
  children: [
    {
      path: '/',
      element: <Dashboard />
    },
    {
      path: '*',
      element: <Navigate to="/" />
    }
  ]
};

export default MainRoutes;
