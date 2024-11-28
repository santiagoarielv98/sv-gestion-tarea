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
import { useDeleteTag } from "../hooks/useTags";
import { Tag } from "../schema/tag-schema";

interface DataTableDeleteDialogProps {
  tag: Tag;
  open: boolean;
  setOpen: (value: boolean) => void;
}

function DataTableDeleteTag({
  tag,
  open,
  setOpen,
}: DataTableDeleteDialogProps) {
  const { isPending, mutate } = useDeleteTag();
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Eliminar etiqueta</AlertDialogTitle>
          <AlertDialogDescription>
            ¿Estás seguro de que deseas eliminar la etiqueta{" "}
            <strong>{tag.name}</strong>? Esta acción no se puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => mutate(tag.id)}
            disabled={isPending}
            className="btn-danger"
          >
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DataTableDeleteTag;
