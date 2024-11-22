import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Tag, tagsSchema } from "../schema/tag-schema";
import { tasksSchema } from "../schema/task-schema";
import {
  createTask,
  deleteTask,
  getTags,
  getTasks,
  restoreTask,
  updateTask,
} from "../services/api";

export const taskQueryKey = ["tasks"];
export const tagQueryKey = ["tags"];

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

export function useTags() {
  return useQuery<Tag[]>({
    queryKey: tagQueryKey,
    queryFn: getTags,
    select: (data) => tagsSchema.parse(data),
    retry: 0,
  });
}
