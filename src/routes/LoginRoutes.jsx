import { lazy } from 'react';

// project import
import Loadable from '@/components/Loadable';
import MinimalLayout from '@/layout/MinimalLayout';
import AuthLogin from '@/pages/authentication/login';
// render - login
const AuthRegister = Loadable(lazy(() => import('@/pages/authentication/register')));

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
