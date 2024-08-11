import List from "@mui/material/List";
import Typography from "@mui/material/Typography";

import useTasks from "@/hooks/useTasks";
import TaskItem from "./components/TaskItem";

function TodayPage() {
  const { todayTasks, tomorrowTasks } = useTasks();

  return (
    <div>
      <Typography variant="h3">Today</Typography>
      {todayTasks.length ? (
        <List>
          {todayTasks.map((task) => (
            <TaskItem key={task._id} task={task} />
          ))}
        </List>
      ) : (
        <Typography variant="h4">No tasks for today</Typography>
      )}
      <Typography variant="h3">Tomorrow</Typography>
      {tomorrowTasks.length ? (
        <List>
          {tomorrowTasks.map((task) => (
            <TaskItem key={task._id} task={task} />
          ))}
        </List>
      ) : (
        <Typography variant="h4">No tasks for tomorrow</Typography>
      )}
    </div>
  );
}

export default TodayPage;
