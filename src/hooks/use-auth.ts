import { AuthContext } from "@/context/auth-provider";
import React from "react";

export const useAuth = () => {
  return React.useContext(AuthContext);
};
