import { columns } from "../table/columns";
import DataTable from "../table/data-table";

function TaskTable() {
  // const { data: tasks = [], error } = useTasks();

  return <DataTable data={[]} columns={columns} />;
}

export default TaskTable;
