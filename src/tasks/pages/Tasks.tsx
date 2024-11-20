import { useQuery } from "@tanstack/react-query";
import { columns } from "../table/columns";
import { DataTable } from "../table/data-table";
import { UserNav } from "../table/user-nav";
import { getTasks } from "../services/api";
import { tasksSchema } from "../schema/task-schema";

function Tasks() {
  const { data: tasks = [] } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => getTasks(),
    select: (data) => tasksSchema.parse(data),
  });

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            ¡Bienvenido de nuevo!
          </h2>
          <p className="text-muted-foreground">
            ¡Aquí tienes una lista de tus tareas para este mes!
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <UserNav />
        </div>
      </div>
      <DataTable data={tasks} columns={columns} />
    </div>
  );
}

export default Tasks;
