import { selectUser } from '@/features/auth/authSlice';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { useCheckQuery } from '@/features/auth/authApi';
import Backdrop from '@mui/material/Backdrop';

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
