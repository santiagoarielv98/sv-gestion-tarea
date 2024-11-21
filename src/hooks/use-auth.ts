import { AuthContext } from "@/context/AuthProvider";
import React from "react";

export const useAuth = () => {
  return React.useContext(AuthContext);
};
