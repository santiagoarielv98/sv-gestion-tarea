import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../services/api";
import { taskQueryKey } from "@/tasks/hooks/useTasks";
import { toast } from "@/hooks/use-toast";

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
