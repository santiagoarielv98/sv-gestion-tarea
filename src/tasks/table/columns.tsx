import type { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

// import { /*labels,*/ priorities, statuses } from "./data/data"
import type { Task } from "../schema/task-schema";
import { DataTableRowActions } from "./data-table-row-actions";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { useToggleTask } from "../hooks/use-tasks";

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    meta: {
      label: "Seleccionar",
    },
    cell: function F({ row }) {
      const { mutate: toggleTask } = useToggleTask();

      return (
        <Checkbox
          checked={row.original.completed}
          onCheckedChange={() => {
            toggleTask(row.original.id);
          }}
          aria-label="Seleccionar fila"
          className="translate-y-[2px]"
        />
      );
    },
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
    // enableSorting: false,
    accessorKey: "title",
    meta: {
      label: "Titulo",
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Titulo" />
    ),
    cell: ({ row }) => {
      const tags = row.original.tags;

      return (
        <div className="flex flex-col">
          <p className="mb-1 line-clamp-1 max-w-[500px] truncate font-semibold">
            {row.getValue("title")}
          </p>
          <p className="mb-2 text-sm text-muted-foreground">
            {row.original.content}
          </p>
          <div className="mx-2 flex flex-wrap gap-1">
            {tags?.map((tag) => (
              <Badge key={tag.id} variant="outline">
                {tag.name}
              </Badge>
            ))}
          </div>
        </div>
      );
    },
  },
  // {
  //   accessorKey: "tags",
  //   meta: {
  //     label: "Etiquetas",
  //   },
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Etiquetas" />
  //   ),
  //   cell: ({ row }) => {
  //     const tags = row.getValue("tags") as Tag[];
  //     return (
  //       <div className="flex flex-wrap gap-1">
  //         {tags.map((tag) => (
  //           <Badge key={tag.id} variant="outline">
  //             {tag.name}
  //           </Badge>
  //         ))}
  //       </div>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "status",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Status" />
  //   ),
  //   cell: ({ row }) => {
  //     const status = statuses.find(
  //       (status) => status.value === row.getValue("status")
  //     )

  //     if (!status) {
  //       return null
  //     }

  //     return (
  //       <div className="flex w-[100px] items-center">
  //         {status.icon && (
  //           <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
  //         )}
  //         <span>{status.label}</span>
  //       </div>
  //     )
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id))
  //   },
  // },
  // {
  //   accessorKey: "priority",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Priority" />
  //   ),
  //   cell: ({ row }) => {
  //     const priority = priorities.find(
  //       (priority) => priority.value === row.getValue("priority")
  //     )

  //     if (!priority) {
  //       return null
  //     }

  //     return (
  //       <div className="flex items-center">
  //         {priority.icon && (
  //           <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
  //         )}
  //         <span>{priority.label}</span>
  //       </div>
  //     )
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id))
  //   },
  // },
  {
    id: "actions",
    meta: {
      label: "Acciones",
    },
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
