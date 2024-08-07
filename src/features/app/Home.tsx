import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

// @ant-design/icons
import DeleteOutlined from "@ant-design/icons/DeleteOutlined";
import EditOutlined from "@ant-design/icons/EditOutlined";

import FullCalendar from "@fullcalendar/react";
import {
  type Task,
  type TaskTag,
  useGetTasksQuery,
  useGetTodayTasksQuery,
  useToggleTaskMutation,
} from "../api/apiSlice";
import listPlugin from "@fullcalendar/list";

function HomePage() {
  const { data: tasks = [] } = useGetTodayTasksQuery();
  const { data: allTasks = [] } = useGetTasksQuery();
  const [toggleTask] = useToggleTaskMutation();

  const handleToggleTask = (invalidTags: TaskTag) => {
    return (id: string) => {
      toggleTask({
        _id: id,
        tag: invalidTags,
      });
    };
  };

  const day = new Date().getDay();
  const index = tasks.findIndex(
    (task) => new Date(task.dueDate).getDay() === day + 1
  );
  // tareas de hoy
  const todayTasks = tasks.slice(0, index);

  // tareas de mañana
  const tomorrowTasks = tasks.slice(index);

  return (
    <div>
      <FullCalendar
        plugins={[listPlugin]}
        initialView="listYear"
        events={allTasks.map((task) => ({
          id: task._id,
          title: task.title,
          date: task.dueDate,
          allDay: true,
        }))}
        height={"90vh"}
      />
      <div hidden>
        <h2>Today</h2>
        <ListTasks
          tasks={todayTasks}
          onClick={handleToggleTask("TodayTasks")}
        />
        <h2>Tomorrow</h2>
        <ListTasks
          tasks={tomorrowTasks}
          onClick={handleToggleTask("TodayTasks")}
        />
      </div>
    </div>
  );
}

export default HomePage;

function ListTasks({
  tasks,
  onClick,
}: {
  tasks: Task[];
  onClick: (id: string) => void;
}) {
  return (
    <Container>
      <List>
        {tasks.map((task) => (
          <ListItem
            key={task._id}
            secondaryAction={
              <>
                <IconButton>
                  <EditOutlined />
                </IconButton>
                <IconButton>
                  <DeleteOutlined />
                </IconButton>
              </>
            }
            disablePadding
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={task.isCompleted}
                onClick={() => onClick(task._id)}
              />
            </ListItemIcon>
            <ListItemText
              primary={task.title}
              secondary={new Date(task.dueDate).toLocaleDateString("es-AR")}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
