import { lazy } from 'react';

// project import
import Loadable from '@/components/Loadable';
import PrivateRoutes from './PrivateRoutes';
import { Navigate } from 'react-router';

// import Dashboard from '@/layout/Dashboard';

const Dashboard = Loadable(lazy(() => import('@/layout/Dashboard')));
const DashboardDefault = Loadable(lazy(() => import('@/pages/dashboard/index')));

// render - sample page
// const HistoryPage = Loadable(lazy(() => import('@/pages/extra-pages/sample-page')));


/**
 * The MainRoutes object   contains the main routes of the application.
 * @type {import('@/react-router-dom').RouteObject} RouteObject
 */
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
    // {
    //   path: 'history',
    //   element: <HistoryPage />
    // },
    {
      path: '*',
      element: <Navigate to="/" />
    }
  ]
};

export default MainRoutes;
