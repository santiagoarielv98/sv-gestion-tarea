import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import React from "react";
import type { UseFormReturn } from "react-hook-form";
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useCreateTag, useTags } from "@/tags/hooks/useTags";

interface SelectTagsProps {
  form: UseFormReturn<{
    title: string;
    content?: string | null;
    tags: number[];
  }>;
}

export function SelectTags({ form }: SelectTagsProps) {
  const [value, setValue] = React.useState<string>("");
  const { data: tags = [] } = useTags();
  const { mutateAsync: createTag } = useCreateTag();

  const handleCreateTag = async () => {
    if (value) {
      const data = await createTag({ name: value });
      setValue("");
      form.setValue("tags", [...form.getValues("tags"), data.id]);
    }
  };

  return (
    <FormField
      control={form.control}
      name="tags"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Etiquetas</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="w-full justify-between"
              >
                {field.value.length > 0
                  ? tags
                      .filter((tag) => field.value.includes(tag.id))
                      .map((tag) => tag.name)
                      .join(", ")
                  : "Seleccionar etiqueta"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput
                  placeholder="Buscar etiqueta..."
                  value={value}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setValue(e.target.value)
                  }
                />
                <CommandList>
                  <CommandEmpty>
                    <p>Etiqueta no encontrada</p>
                    <Button
                      variant="ghost"
                      className="mt-2 text-wrap"
                      onClick={handleCreateTag}
                    >
                      Crear etiqueta "{value}"
                    </Button>
                  </CommandEmpty>
                  <CommandGroup>
                    {tags.map((tag) => (
                      <CommandItem
                        key={tag.id}
                        value={tag.name}
                        onSelect={() => {
                          const value = tag.id;
                          if (field.value.includes(value)) {
                            form.setValue(
                              "tags",
                              field.value.filter(
                                (tagId: number) => tagId !== value,
                              ),
                            );
                          } else {
                            form.setValue("tags", [...field.value, value]);
                          }
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            field.value.includes(tag.id)
                              ? // value === String(tag.id)
                                "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        {tag.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormDescription>
            Selecciona las etiquetas que mejor describan tu tarea.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
