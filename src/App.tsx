import { DataTable } from "./tasks/data-table";
import { UserNav } from "./tasks/user-nav";

import tasks from "./tasks/data/tasks.json";
import { columns } from "./tasks/columns";

function App() {
  
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
  )
}

export default App