import type { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// import { labels } from "./data/data"
import React from "react";
import { tagSchema } from "../schema/tag-schema";
import DataTableDeleteTag from "./data-table-delete-tag";
import DataTableEditTag from "./data-table-edit-tag";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const tag = tagSchema.parse(row.original);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal />
          <span className="sr-only">Abrir menú de acciones</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onSelect={() => setOpenEdit(true)}>
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setOpenDelete(true)}>
          Eliminar
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
      <DataTableEditTag tag={tag} open={openEdit} setOpen={setOpenEdit} />
      <DataTableDeleteTag tag={tag} open={openDelete} setOpen={setOpenDelete} />
    </DropdownMenu>
  );
}
