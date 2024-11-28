import { toast } from "@/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Tag } from "../schema/tag-schema";
import { tagsSchema } from "../schema/tag-schema";
import { createTag, getTags, deleteTag, updateTag } from "../services/api";

export const tagQueryKey = ["tags"];

export function useTags() {
  return useQuery<Tag[]>({
    queryKey: tagQueryKey,
    queryFn: getTags,
    select: (data) => tagsSchema.parse(data),
    retry: 0,
  });
}

export function useCreateTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTag,
    onSuccess: () => {
      toast({
        title: "Etiqueta creada",
        description: "La etiqueta ha sido creada correctamente.",
      });
      queryClient.invalidateQueries({ queryKey: tagQueryKey });
    },
  });
}

export function useUpdateTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTag,
    onSuccess: () => {
      toast({
        title: "Etiqueta actualizada",
        description: "La etiqueta ha sido actualizada correctamente.",
      });
      queryClient.invalidateQueries({ queryKey: tagQueryKey });
    },
  });
}

export function useDeleteTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTag,
    onSuccess: () => {
      toast({
        title: "Etiqueta eliminada",
        description: "La etiqueta ha sido eliminada correctamente.",
      });
      queryClient.invalidateQueries({ queryKey: tagQueryKey });
    },
  });
}
