import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchProfile, login } from "../services/api";
import { taskQueryKey } from "@/tasks/hooks/useTasks";
import { toast } from "@/hooks/use-toast";
import { User } from "../schema/user-schema";

export const authQueryKey = ["auth"];

export function useProfile() {
  return useQuery<User>({
    queryKey: authQueryKey,
    queryFn: fetchProfile,
    retry: 0,
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
      queryClient.invalidateQueries({ queryKey: taskQueryKey });
    },
  });
}
