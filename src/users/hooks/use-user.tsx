import { authQueryKey, taskQueryKey } from "@/constants/query-key";
import { toast } from "@/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { User } from "../schema/user-schema";
import { fetchProfile, login, register } from "../services/api";

export function useProfile() {
  return useQuery<User | null>({
    queryKey: authQueryKey,
    queryFn: fetchProfile,
    retry: 0,
    throwOnError: (error, _query) => {
      const axiosError = error as AxiosError;
      if (axiosError?.response?.status === 401) {
        _query.setData(null);
        return false;
      }
      return false;
    },
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("token", data.access_token);
      toast({
        title: "Inicio de sesión exitoso",
        description: "Ahora estás conectado",
      });
      queryClient.invalidateQueries({ queryKey: authQueryKey });
      queryClient.invalidateQueries({ queryKey: taskQueryKey });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => Promise.resolve(),
    onSuccess: () => {
      localStorage.removeItem("token");
      queryClient.invalidateQueries({ queryKey: authQueryKey });
      toast({
        title: "Cierre de sesión exitoso",
        description: "Ahora estás desconectado",
      });
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      localStorage.setItem("token", data.access_token);
      toast({
        title: "Registro exitoso",
        description: "Ahora puedes iniciar sesión",
      });
      queryClient.invalidateQueries({ queryKey: authQueryKey });
    },
  });
}
