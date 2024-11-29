import { z } from "@/es-zod";
import { tagsSchema } from "@/tags/schema/tag-schema";

export const taskSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string().nullish(),
  tags: tagsSchema,
  completed: z.boolean(),
});

export const createTaskSchema = z.object({
  title: z.string().min(1),
  content: z.string().nullish(),
  tags: z.array(z.number()),
  completed: z.boolean(),
});

export const updateTaskSchema = z.object({
  title: z.string().min(1),
  content: z.string().nullish(),
  tags: z.array(z.number()),
  completed: z.boolean(),
});

export const tasksSchema = z.array(taskSchema);

export type Task = z.infer<typeof taskSchema>;
export type CreateTask = z.infer<typeof createTaskSchema>;
export type UpdateTask = z.infer<typeof updateTaskSchema>;
