import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import DeleteOutlinedIcon from "@ant-design/icons/DeleteOutlined";
import EditOutlinedIcon from "@ant-design/icons/EditOutlined";
import type { Tasks } from "@/app/services/api";

interface TaskItemProps {
  task: Tasks;
}

function TaskItem({ task }: TaskItemProps) {
  return (
    <ListItem
      key={task._id}
      secondaryAction={
        <>
          <IconButton aria-label="edit">
            <EditOutlinedIcon />
          </IconButton>
          <IconButton edge="end" aria-label="delete">
            <DeleteOutlinedIcon />
          </IconButton>
        </>
      }
      disablePadding
    >
      <ListItemButton disableRipple role={undefined} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={task.isCompleted}
            tabIndex={-1}
            disableRipple
          />
        </ListItemIcon>
        <ListItemText /* id={labelId} */ primary={task.title} />
      </ListItemButton>
    </ListItem>
  );
}

export default TaskItem;
