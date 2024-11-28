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
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { useCreateTag } from "../hooks/use-tags";
import type { CreateTag } from "../schema/tag-schema";
import { createTagSchema } from "../schema/tag-schema";
import TagForm from "./tag-form";

function DataTableCreateTag() {
  const [open, setOpen] = React.useState(false);
  const [openDiscard, setOpenDiscard] = React.useState(false);
  const { mutate, isPending } = useCreateTag();

  const form = useForm<CreateTag>({
    resolver: zodResolver(createTagSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: CreateTag) {
    try {
      await mutate(values);
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
          Crear etiqueta
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear nueva etiqueta</DialogTitle>
          <DialogDescription>
            Complete los campos para crear una nueva etiqueta.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <TagForm form={form} />
            <DialogFooter>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting || isPending}
              >
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

export default DataTableCreateTag;
