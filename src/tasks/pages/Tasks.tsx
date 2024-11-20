import React from "react";

import { UserNav } from "../table/user-nav";

const TaskTable = React.lazy(() => import("./TaskTable"));

function Tasks() {
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
      <React.Suspense fallback={null}>
        <TaskTable />
      </React.Suspense>
    </div>
  );
}

export default Tasks;
