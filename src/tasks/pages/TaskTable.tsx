import { useTasks } from "../hooks/useTasks";
import DataTable from "../table/data-table";
import { columns } from "../table/columns";
import React from "react";
import { toast } from "@/hooks/use-toast";

function TaskTable() {
  const { data: tasks = [], error } = useTasks();

  React.useEffect(() => {
    if (error) {
      (error as unknown as Response)?.json?.().then(({ message }) => {
        toast({
          title: "Error",
          description: message ?? "No se pudieron cargar las tareas",
          variant: "destructive",
        });
      });
    }
  }, [error]);

  return <DataTable data={tasks} columns={columns} />;
}

export default TaskTable;
