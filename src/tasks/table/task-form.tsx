import { SelectTags } from "@/components/select-tags";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { UseFormReturn } from "react-hook-form";

interface TaskFormProps {
  form: UseFormReturn<{
    title: string;
    content?: string | null;
    tags: number[];
  }>;
}

function TaskForm({ form }: TaskFormProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Titulo</FormLabel>
            <FormControl>
              <Input placeholder="Titulo de la tarea" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="content"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Contenido</FormLabel>
            <FormControl>
              <Input
                placeholder="Contenido de la tarea"
                {...field}
                value={field.value!}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <SelectTags form={form} />
    </div>
  );
}

export default TaskForm;
