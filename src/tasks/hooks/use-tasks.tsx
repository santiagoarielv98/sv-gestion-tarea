import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { tasksSchema } from "../schema/task-schema";
import {
  createTask,
  deleteTask,
  getTasks,
  getTasksPage,
  restoreTask,
  updateTask,
} from "../services/api";
import type { PaginateOptions } from "@/paginate/types/paginate";
import { taskQueryKey } from "@/constants/query-key";

export function useTasks() {
  return useQuery({
    queryKey: taskQueryKey,
    queryFn: getTasks,
    select: (data) => tasksSchema.parse(data),
    retry: 0,
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();
  const { mutate: restoreTask } = useRestoreTask();

  return useMutation({
    mutationFn: deleteTask,
    onSuccess: (data) => {
      toast({
        title: "Tarea eliminada",
        description: `La tarea "${data.title}" ha sido eliminada correctamente.`,
        action: (
          <ToastAction altText="Deshacer" onClick={() => restoreTask(data.id)}>
            Deshacer
          </ToastAction>
        ),
      });
      queryClient.invalidateQueries({ queryKey: taskQueryKey });
    },
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      toast({
        title: "Tarea creada",
        description: "La tarea ha sido creada correctamente.",
      });
      queryClient.invalidateQueries({ queryKey: taskQueryKey });
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      toast({
        title: "Tarea actualizada",
        description: "La tarea ha sido actualizada correctamente.",
      });
      queryClient.invalidateQueries({ queryKey: taskQueryKey });
    },
  });
}

export function useRestoreTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: restoreTask,
    onSuccess: () => {
      toast({
        title: "Tarea restaurada",
        description: "La tarea ha sido restaurada correctamente.",
      });
      queryClient.invalidateQueries({ queryKey: taskQueryKey });
    },
  });
}

export function usePaginateTasks(options: PaginateOptions) {
  return useQuery({
    queryKey: ["tasks", options],
    queryFn: () => getTasksPage(options),
    select: (paginate) => tasksSchema.parse(paginate.data),
    retry: 0,
  });
}
