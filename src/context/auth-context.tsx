import type { User } from "@/users/schema/user-schema";
import React from "react";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
}

export const AuthContext = React.createContext<AuthContextType>({
  user: null,
  isLoading: true,
});
