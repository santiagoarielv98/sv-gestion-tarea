import { useQuery } from "@tanstack/react-query";
import { getTasksPage } from "../services/api";
import { columns } from "../table/columns";
import DataTable from "../../components/data-table";
import React from "react";

function TaskTable() {
  const [search, setSearch] = React.useState("");
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const tableQuery = useQuery({
    queryKey: ["tasks", pagination, search],
    queryFn: () =>
      getTasksPage({
        limit: pagination.pageSize,
        page: pagination.pageIndex + 1,
        q: search,
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
    />
  );
}

export default TaskTable;
