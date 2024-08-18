import { lazy } from 'react';

import Loadable from '@/components/Loadable';
import { Navigate } from 'react-router';
import PrivateRoutes from './PrivateRoutes';

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
