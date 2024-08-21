import { useCheckQuery } from '@/features/auth/authApi';
import { selectUser } from '@/features/auth/authSlice';
import Backdrop from '@mui/material/Backdrop';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function MinimalLayout() {
  const user = useSelector(selectUser);
  const { isLoading } = useCheckQuery();

  return (
    <>
      {isLoading && <Backdrop open={true} sx={{ zIndex: 9999 }} />}
      {user ? <Navigate to="/app" /> : <Outlet />}
    </>
  );
}
