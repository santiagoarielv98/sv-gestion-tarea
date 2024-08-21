import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

import Backdrop from '@mui/material/Backdrop';

import { useCheckQuery } from '@/features/auth/authApi';
import { selectUser } from '@/features/auth/authSlice';

function PrivateRoutes({ children }: { children: React.ReactNode }) {
  const { isLoading } = useCheckQuery();
  const user = useSelector(selectUser);

  if (isLoading) {
    return <Backdrop open={true} />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoutes;
