import { z } from "@/es-zod";

export const tagSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const createTagSchema = z.object({
  name: z.string().min(1),
});

export const updateTagSchema = z.object({
  name: z.string().min(1),
});

export const tagsSchema = z.array(tagSchema);

export type Tag = z.infer<typeof tagSchema>;
export type CreateTag = z.infer<typeof createTagSchema>;
export type UpdateTag = z.infer<typeof updateTagSchema>;
