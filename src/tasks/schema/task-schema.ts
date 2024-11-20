import { z } from "zod";

export const taskSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string().nullish(),
});

export const createTaskSchema = z.object({
  title: z.string().min(1),
  content: z.string(),
});

export const tasksSchema = z.array(taskSchema);

export type Task = z.infer<typeof taskSchema>;
export type CreateTask = z.infer<typeof createTaskSchema>;
