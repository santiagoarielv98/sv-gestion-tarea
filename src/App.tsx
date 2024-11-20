import { DataTable } from "./tasks/table/data-table";
import { UserNav } from "./tasks/table/user-nav";

import tasks from "./tasks/data/tasks.json";
import { columns } from "./tasks/table/columns";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  )
}

export default App