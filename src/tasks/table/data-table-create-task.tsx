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

import { Plus } from "lucide-react";
import { CreateTask, createTaskSchema } from "../schema/task-schema";
import useTasks from "../hooks/useTasks";
import React from "react";
import TaskForm from "./task-form";

function DataTableCreateTask() {
  const [open, setOpen] = React.useState(false);
  const [openDiscard, setOpenDiscard] = React.useState(false);
  const { createTaskMutation } = useTasks();

  const form = useForm<CreateTask>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  async function onSubmit(values: CreateTask) {
    try {
      await createTaskMutation(values);
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
    <Dialog open={open} onOpenChange={handleOpenDiscard}>
      <DialogTrigger asChild>
        <Button size="sm" className="ml-auto h-8 lg:flex" variant="outline">
          <Plus />
          Crear tarea
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear nueva tarea</DialogTitle>
          <DialogDescription>
            Complete los campos para crear una nueva tarea.
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

export default DataTableCreateTask;
