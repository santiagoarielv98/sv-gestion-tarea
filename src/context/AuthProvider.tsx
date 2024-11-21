import { useProfile } from "@/users/hooks/use-user";
import { User } from "@/users/schema/user-schema";
import React from "react";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
}

export const AuthContext = React.createContext<AuthContextType>({
  user: null,
  isLoading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: user = null, isLoading } = useProfile();
  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
