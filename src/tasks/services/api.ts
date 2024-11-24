import { api } from "@/common/constants/api";
import { Tag } from "@/tag/schema/tag-schema";
import { CreateTask, Task, UpdateTask } from "../schema/task-schema";

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

export const getTags = async (): Promise<Tag[]> => {
  const response = await api.get<Tag[]>("/tags");
  return response.data;
};

export const createTag = async (name: string): Promise<Tag> => {
  const response = await api.post<Tag>("/tags", { name });
  return response.data;
};
