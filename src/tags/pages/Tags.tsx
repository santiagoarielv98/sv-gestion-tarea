import DataTable from "@/components/data-table";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getTagsPage } from "../services/api";
import { columns } from "../table/columns";
import type { SortingState } from "@tanstack/react-table";

function TagTable() {
  const [search, setSearch] = React.useState("");
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const tableQuery = useQuery({
    queryKey: ["tags", pagination, search, sorting],
    queryFn: () =>
      getTagsPage({
        limit: pagination.pageSize,
        page: pagination.pageIndex + 1,
        q: search,
        sorting: sorting,
      }),
    retry: 0,
  });

  return (
    <DataTable
      key={2}
      data={tableQuery?.data?.data ?? []}
      columns={columns}
      pagination={pagination}
      setPagination={setPagination}
      paginationOptions={{ rowCount: tableQuery.data?.meta.totalItems }}
      search={search}
      setSearch={setSearch}
      sorting={sorting}
      setSorting={setSorting}
    />
  );
}

export default TagTable;
