import useTasks from "../hooks/useTasks";
import DataTable from "../table/data-table";
import { columns } from "../table/columns";

function TaskTable() {
  const { tasks } = useTasks();

  return <DataTable data={tasks} columns={columns} />;
}

export default TaskTable;
