import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Task, UpdateTask, updateTaskSchema } from "../schema/task-schema";
import useTasks from "../hooks/useTasks";
import React from "react";
import TaskForm from "./task-form";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface DataTableEditTaskProps {
  task: Task;
}

function DataTableEditTask({ task }: DataTableEditTaskProps) {
  const [open, setOpen] = React.useState(false);
  const [openDiscard, setOpenDiscard] = React.useState(false);
  const { updateTaskMutation } = useTasks();

  const form = useForm<UpdateTask>({
    resolver: zodResolver(updateTaskSchema),
    defaultValues: {
      title: task.title,
      content: task.content!,
    },
  });

  async function onSubmit(values: UpdateTask) {
    if (!task.id) return;
    try {
      await updateTaskMutation({ ...values, id: task.id });
      setOpen(false);
      form.reset();
    } catch (error) {
      console.error(error);
    }
  }

  const handleOpenDiscard = (value: boolean) => {
    if (form.formState.isDirty) {
      setOpenDiscard(true);
    } else {
      setOpen(value);
    }
  };

  const handleDiscard = () => {
    setOpenDiscard(false);
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenDiscard} modal>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          Editar
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar tarea</DialogTitle>
          <DialogDescription>
            Complete los campos para editar la tarea.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <TaskForm form={form} />
            <DialogFooter>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                Guardar cambios
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
      <AlertDialog open={openDiscard} onOpenChange={setOpenDiscard}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              ¿Estás seguro que deseas descartar los cambios?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Los cambios realizados se perderán.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction className="btn-danger" onClick={handleDiscard}>
              Descartar cambios
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  );
}

export default DataTableEditTask;
