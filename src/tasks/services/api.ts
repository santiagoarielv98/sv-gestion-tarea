import { api } from "@/constants/api";
import { CreateTask, Task, UpdateTask } from "../schema/task-schema";
import { Paginate, PaginateOptions } from "@/paginate/types/paginate";

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

export const updateTask = async ({
  id,
  ...task
}: UpdateTask & { id: number }): Promise<Task> => {
  const response = await api.patch<Task>(`/tasks/${id}`, task);
  return response.data;
};

export const deleteTask = async (id: number): Promise<Task> => {
  const response = await api.delete<Task>(`/tasks/${id}`);
  return response.data;
};

export const restoreTask = async (id: number): Promise<Task> => {
  const response = await api.patch<Task>(`/tasks/${id}/restore`);
  return response.data;
};

export const getTasksPage = async ({
  page,
  limit,
}: PaginateOptions): Promise<Paginate<Task>> => {
  const response = await api.get<Paginate<Task>>("/tasks/all", {
    params: { page, limit },
  });
  return response.data;
};
