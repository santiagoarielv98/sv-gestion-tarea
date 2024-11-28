import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Tag } from "../schema/tag-schema";

interface DataTableShowTagProps {
  tag: Tag | null;
  open: boolean;
  setOpen: (value: boolean) => void;
}

function DataTableShowTag({ tag, open, setOpen }: DataTableShowTagProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen} modal>
      <DialogContent>
        <DialogHeader>
          {tag && <DialogTitle>{tag.name}</DialogTitle>}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default DataTableShowTag;
