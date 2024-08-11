import useTasks from "@/hooks/useTasks";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import TaskItem from "./components/TaskItem";

function CompletedPage() {
  const { completedTasks } = useTasks();
  return (
    <div>
      <Typography variant="h3">Today</Typography>
      {completedTasks.length ? (
        <List>
          {completedTasks.map((task) => (
            <TaskItem key={task._id} task={task} />
          ))}
        </List>
      ) : (
        <Typography variant="h4">No tasks for today</Typography>
      )}
    </div>
  );
}

export default CompletedPage;
