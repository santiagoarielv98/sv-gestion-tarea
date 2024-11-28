import { useQuery } from "@tanstack/react-query";
import { SortingState } from "@tanstack/react-table";
import React from "react";
import DataTable from "../../components/data-table";
import { getTasksPage } from "../services/api";
import { columns } from "../table/columns";

function TaskTable() {
  const [search, setSearch] = React.useState("");
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const tableQuery = useQuery({
    queryKey: ["tasks", pagination, search, sorting],
    queryFn: () =>
      getTasksPage({
        limit: pagination.pageSize,
        page: pagination.pageIndex + 1,
        q: search,
        sorting: sorting,
      }),
    retry: 0,
  });

  return (
    <DataTable
      data={tableQuery.data?.data ?? []}
      columns={columns}
      pagination={pagination}
      setPagination={setPagination}
      search={search}
      setSearch={setSearch}
      paginationOptions={{ rowCount: tableQuery.data?.meta.totalItems }}
      sorting={sorting}
      setSorting={setSorting}
    />
  );
}

export default TaskTable;
