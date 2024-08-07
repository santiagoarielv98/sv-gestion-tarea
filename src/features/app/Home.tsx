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

import { useCompleteTaskMutation, useGetTasksQuery } from "../api/apiSlice";

function HomePage() {
  return (
    <div>
      <h1>Home</h1>
      <ListTasks />
    </div>
  );
}

export default HomePage;

function ListTasks() {
  const [completeTask] = useCompleteTaskMutation();
  const { data: tasks = [] } = useGetTasksQuery();
  return (
    <Container>
      <List>
        {tasks
          .filter((task) => !task.isCompleted)
          .slice(0, 20)
          .map((task) => (
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
                  onClick={() => completeTask({ _id: task._id })}
                />
              </ListItemIcon>
              <ListItemText primary={task.title} />
            </ListItem>
          ))}
      </List>
    </Container>
  );
}
