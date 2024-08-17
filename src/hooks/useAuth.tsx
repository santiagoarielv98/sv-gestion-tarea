import { useLoginMutation, useLogoutMutation } from 'features/auth/authApi';

function useAuth() {
  const [login] = useLoginMutation();
  const [logout] = useLogoutMutation();

  return {
    login,
    logout
  };
}
export default useAuth;
