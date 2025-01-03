import type { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

import type { Tag } from "../schema/tag-schema";
import { DataTableColumnHeader } from "../../components/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<Tag>[] = [
  {
    id: "select",
    meta: {
      label: "Seleccionar",
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Seleccionar fila"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    meta: {
      label: "ID",
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    // enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    meta: {
      label: "Nombre",
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
    // enableSorting: false,
  },
  {
    id: "actions",
    meta: {
      label: "Acciones",
    },
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
