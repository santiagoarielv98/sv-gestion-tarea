import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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

import type { Tag, UpdateTag } from "../schema/tag-schema";
import { updateTagSchema } from "../schema/tag-schema";
import { useUpdateTag } from "../hooks/use-tags";
import React from "react";
import TagForm from "./tag-form";

interface DataTableEditTagProps {
  tag: Tag;
  open: boolean;
  setOpen: (value: boolean) => void;
}

function DataTableEditTag({ tag, open, setOpen }: DataTableEditTagProps) {
  const [openDiscard, setOpenDiscard] = React.useState(false);
  const { mutate, isPending } = useUpdateTag();

  const form = useForm<UpdateTag>({
    resolver: zodResolver(updateTagSchema),
    defaultValues: {
      name: tag.name,
    },
  });

  async function onSubmit(values: UpdateTag) {
    if (!tag.id) return;
    try {
      await mutate({ ...values, id: tag.id });
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar etiqueta</DialogTitle>
          <DialogDescription>
            Complete los campos para editar la etiqueta.
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

export default DataTableEditTag;
