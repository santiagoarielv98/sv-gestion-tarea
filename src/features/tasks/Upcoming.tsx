import useTasks from "@/hooks/useTasks";
import Typography from "@mui/material/Typography";
import TaskItem from "./components/TaskItem";
import List from "@mui/material/List";

function UpcomingPage() {
  const { upcomingTasks } = useTasks();
  return (
    <div>
      <Typography variant="h3">Today</Typography>
      {upcomingTasks.length ? (
        <List>
          {upcomingTasks.map((task) => (
            <TaskItem key={task._id} task={task} />
          ))}
        </List>
      ) : (
        <Typography variant="h4">No tasks for today</Typography>
      )}
    </div>
  );
}

export default UpcomingPage;
