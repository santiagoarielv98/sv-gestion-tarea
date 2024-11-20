import { apiUrl } from "@/common/constants/app";
import { Task } from "../schema/task-schema";

export const getTask = async (id: string): Promise<Task> => {
  const response = await fetch(`${apiUrl}/tasks/${id}`);
  return response.json();
};

export const getTasks = async (): Promise<Task[]> => {
  const response = await fetch(`${apiUrl}/tasks`);
  return response.json();
};

export const createTask = async (task: Omit<Task, "id">): Promise<Task> => {
  const response = await fetch(`${apiUrl}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  return response.json();
};

export const updateTask = async (task: Task): Promise<Task> => {
  const response = await fetch(`${apiUrl}/tasks/${task.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  return response.json();
};

export const deleteTask = async (id: string): Promise<void> => {
  await fetch(`${apiUrl}/tasks/${id}`, {
    method: "DELETE",
  });
};