import { useTags } from "../hooks/useTags";
import DataTable from "../table/data-table";
import { columns } from "../table/columns";
import React from "react";
import { toast } from "@/hooks/use-toast";

function TagTable() {
  const { data: tasks = [], error } = useTags();

  React.useEffect(() => {
    if (error) {
      (error as unknown as Response)?.json?.().then(({ message }) => {
        toast({
          title: "Error",
          description: message ?? "No se pudieron cargar las etiquetas",
          variant: "destructive",
        });
      });
    }
  }, [error]);

  return <DataTable data={tasks} columns={columns} />;
}

export default TagTable;
