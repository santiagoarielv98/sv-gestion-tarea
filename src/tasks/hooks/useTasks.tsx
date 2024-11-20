import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTask, deleteTask, getTasks } from "../services/api";
import { tasksSchema } from "../schema/task-schema";

const taskQueryKey = ["tasks"];

function useTasks() {
  const queryClient = useQueryClient();

  const { data: tasks = [] } = useQuery({
    queryKey: taskQueryKey,
    queryFn: getTasks,
    select: (data) => tasksSchema.parse(data),
  });

  const { mutate: deleteTaskMutation, isPending: isPendingDelete } =
    useMutation({
      mutationFn: deleteTask,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: taskQueryKey });
      },
    });

  const { mutate: createTaskMutation } = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskQueryKey });
    },
  });

  return {
    tasks,
    isPendingDelete,
    deleteTaskMutation,
    createTaskMutation,
  };
}

export default useTasks;
