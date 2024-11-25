import { api } from "@/constants/api";
import { CreateTag, Tag } from "../schema/tag-schema";

export const getTags = async (): Promise<Tag[]> => {
  const response = await api.get<Tag[]>("/tags");
  return response.data;
};

export const createTag = async ({ name }: CreateTag): Promise<Tag> => {
  const response = await api.post<Tag>("/tags", { name });
  return response.data;
};

export const updateTag = async ({ id, ...name }: Tag): Promise<Tag> => {
  const response = await api.put<Tag>(`/tags/${id}`, { name });
  return response.data;
};

export const deleteTag = async (id: number): Promise<void> => {
  await api.delete(`/tags/${id}`);
};
