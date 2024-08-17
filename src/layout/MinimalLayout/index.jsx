import { useCheckQuery } from '@/features/auth/authApi';
import { selectUser } from '@/features/auth/authSlice';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';



export default function MinimalLayout() {
  const user = useSelector(selectUser);
  const { isLoading } = useCheckQuery();
  // const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (user) {
    return <Navigate to="/" />;
    // navigate('/', { replace: true });
  }

  return (
    <>
      <Outlet />
    </>
  );
}
