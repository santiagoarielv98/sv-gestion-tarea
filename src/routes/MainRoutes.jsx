import { lazy } from 'react';

// project import
import Loadable from '@/components/Loadable';
import PrivateRoutes from './PrivateRoutes';
import { Navigate } from 'react-router';

// import Dashboard from '@/layout/Dashboard';

const Dashboard = Loadable(lazy(() => import('@/layout/Dashboard')));
const DashboardDefault = Loadable(lazy(() => import('@/pages/dashboard/index')));

const MainRoutes = {
  path: '/',
  element: (
    <PrivateRoutes>
      <Dashboard />
    </PrivateRoutes>
  ),
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: '*',
      element: <Navigate to="/" />
    }
  ]
};

export default MainRoutes;
