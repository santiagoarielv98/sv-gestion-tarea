import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { Task } from "../schema/task-schema";

interface DataTableShowTaskProps {
  task: Task | null;
  open: boolean;
  setOpen: (value: boolean) => void;
}

function DataTableShowTask({ task, open, setOpen }: DataTableShowTaskProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen} modal>
      <DialogContent>
        <DialogHeader>
          {task && (
            <>
              <DialogTitle>{task.title}</DialogTitle>
              <DialogDescription>{task.content}</DialogDescription>
            </>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default DataTableShowTask;
