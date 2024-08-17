import PropTypes from 'prop-types';

import { selectUser } from 'features/auth/authSlice';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { useCheckQuery } from 'features/auth/authApi';

function PrivateRoutes({ children }) {
  const { isLoading } = useCheckQuery();
  const user = useSelector(selectUser);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

PrivateRoutes.propTypes = {
  children: PropTypes.node
};

export default PrivateRoutes;
