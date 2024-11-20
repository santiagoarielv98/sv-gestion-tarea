import { CreateTask, Task } from "../schema/task-schema";
import { api } from "@/common/constants/api";

export const getTask = async (id: number): Promise<Task> => {
  const response = await api.get<Task>(`/tasks/${id}`);
  return response.data;
};

export const getTasks = async (): Promise<Task[]> => {
  const response = await api.get<Task[]>("/tasks");
  return response.data;
};

export const createTask = async (task: CreateTask): Promise<Task> => {
  const response = await api.post<Task>("/tasks", task);
  return response.data;
};

export const updateTask = async ({ id, ...task }: Task): Promise<Task> => {
  const response = await api.patch<Task>(`/tasks/${id}`, task);
  return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};
