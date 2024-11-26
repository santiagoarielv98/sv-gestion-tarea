import { useQuery } from "@tanstack/react-query";
import { getTasksPage } from "../services/api";
import { columns } from "../table/columns";
import DataTable from "../table/data-table";
import React from "react";

function TaskTable() {
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const tableQuery = useQuery({
    queryKey: ["tasks", pagination],
    queryFn: () =>
      getTasksPage({
        limit: pagination.pageSize,
        page: pagination.pageIndex + 1,
      }),
    retry: 0,
  });

  return (
    <DataTable
      data={tableQuery.data?.data ?? []}
      columns={columns}
      pagination={pagination}
      setPagination={setPagination}
      paginationOptions={{ rowCount: tableQuery.data?.meta.totalItems }}
    />
  );
}

export default TaskTable;
