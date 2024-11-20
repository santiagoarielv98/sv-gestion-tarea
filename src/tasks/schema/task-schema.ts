import { z } from "zod";

export const taskSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string().nullish(),
});

export const tasksSchema = z.array(taskSchema);

export type Task = z.infer<typeof taskSchema>;
