import { lazy } from 'react';

import Loadable from '@/components/Loadable';
import MinimalLayout from '@/layout/MinimalLayout';

const AuthLogin = Loadable(lazy(() => import('@/features/auth/pages/Login')));
const AuthRegister = Loadable(lazy(() => import('@/features/auth/pages/Register')));

const LoginRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/login',
      element: <AuthLogin />
    },
    {
      path: '/register',
      element: <AuthRegister />
    }
  ]
};

export default LoginRoutes;
