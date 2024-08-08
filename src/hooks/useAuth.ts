import React from "react";

import { selectUser } from "@/features/auth/authSlice";
import { useAppSelector } from "@/hooks/store";

function useAuth() {
  const user = useAppSelector(selectUser);

  return React.useMemo(() => ({ user }), [user]);
}

export default useAuth;
