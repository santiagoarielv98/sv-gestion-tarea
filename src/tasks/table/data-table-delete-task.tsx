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
import { useDeleteTask } from "../hooks/useTasks";
import type { Task } from "../schema/task-schema";

interface DataTableDeleteDialogProps {
  task: Task;
  open: boolean;
  setOpen: (value: boolean) => void;
}

function DataTableDeleteTask({
  task,
  open,
  setOpen,
}: DataTableDeleteDialogProps) {
  const { isPending, mutate } = useDeleteTask();
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Eliminar tarea</AlertDialogTitle>
          <AlertDialogDescription>
            ¿Estás seguro de que deseas eliminar la tarea{" "}
            <strong>{task.title}</strong>? Esta acción no se puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => mutate(task.id)}
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

export default DataTableDeleteTask;
