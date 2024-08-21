import { lazy } from 'react';

import Loadable from '@/components/Loadable';
import { Navigate } from 'react-router';
import PrivateRoutes from './PrivateRoutes';

const MainLayout = Loadable(lazy(() => import('@/layout/MainLayout')));
const TaksPage = Loadable(lazy(() => import('@/features/tasks/pages/Home')));
const TagsPage = Loadable(lazy(() => import('@/features/labels/pages/Home')));

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
      element: <TaksPage />
    },
    {
      path: '/tags',
      element: <TagsPage />
    },
    {
      path: '*',
      element: <Navigate to="/" />
    }
  ]
};

export default MainRoutes;
