import * as z from "zod"

export const createTaskSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().optional(),  
  dueDate: z.date().optional(),
  priority: z.enum(["low", "medium", "high"]).optional().default("medium"),
  tags: z.array(z.string()).optional().default([]),
})

export type CreateTaskSchema = z.infer<typeof createTaskSchema>
