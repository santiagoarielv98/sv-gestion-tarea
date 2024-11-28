import type { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";

import { DataTableViewOptions } from "@/components/data-table-view-options";
import { DebouncedInput } from "@/components/debounced-input";
import DataTableCreateTask from "./data-table-create-tag";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <DebouncedInput
          placeholder="Filtrar etiquetas..."
          value={table.getState().globalFilter}
          onChange={(value) => table.setGlobalFilter(String(value))}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Restablecer
            <X />
          </Button>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <DataTableViewOptions table={table} />
        <DataTableCreateTask />
      </div>
    </div>
  );
}
