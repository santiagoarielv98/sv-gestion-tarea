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
import { useTags } from "@/tasks/hooks/useTasks";
import { UseFormReturn } from "react-hook-form";
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

interface SelectTagsProps {
  form: UseFormReturn<{
    title: string;
    content?: string | null;
    tags: number[];
  }>;
}

export function SelectTags({ form }: SelectTagsProps) {
  const { data: tags = [] } = useTags();

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
                <CommandInput placeholder="Buscar etiqueta..." />
                <CommandList>
                  <CommandEmpty>Etiqueta no encontrada</CommandEmpty>
                  <CommandGroup>
                    {tags.map((tag) => (
                      <CommandItem
                        key={tag.id}
                        value={String(tag.id)}
                        onSelect={(currentValue) => {
                          const value = parseInt(currentValue);

                          if (field.value.includes(value)) {
                            form.setValue(
                              "tags",
                              field.value.filter(
                                (tagId: number) => tagId !== value
                              )
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
                              : "opacity-0"
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
