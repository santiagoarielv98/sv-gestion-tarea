import type {
  ColumnDef,
  OnChangeFn,
  PaginationOptions,
  PaginationState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTableToolbar } from "../tasks/table/data-table-toolbar";
import { DataTablePagination } from "./data-table-pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination: PaginationState;
  setPagination: OnChangeFn<PaginationState>;
  paginationOptions: Pick<PaginationOptions, "rowCount">;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  sorting?: SortingState;
  setSorting: OnChangeFn<SortingState> | undefined;
}

function DataTable<TData, TValue>({
  columns,
  data,
  pagination,
  paginationOptions,
  setPagination,
  search,
  setSearch,
  sorting,
  setSorting,
}: DataTableProps<TData, TValue>) {
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const table = useReactTable({
    data: data ?? [],
    columns,
    state: {
      columnVisibility,
      pagination,
      globalFilter: search,
      sorting,
    },
    enableRowSelection: true,
    onPaginationChange: setPagination,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setSearch,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    // manualFiltering: true,
    manualPagination: true,
    manualSorting: true,
    ...paginationOptions,
  });

  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} />
      <div className="max-h-[65vh] overflow-auto whitespace-nowrap rounded-md border md:max-h-[75vh]">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sin resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}

export default DataTable;
