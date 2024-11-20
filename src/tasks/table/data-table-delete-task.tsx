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
import useTasks from "../hooks/useTasks";
import { Task } from "../schema/task-schema";

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
  const { isPendingDelete, deleteTaskMutation } = useTasks();
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
            onClick={() => deleteTaskMutation(task.id)}
            disabled={isPendingDelete}
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
