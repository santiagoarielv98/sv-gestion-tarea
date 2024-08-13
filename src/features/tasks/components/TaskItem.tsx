import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteOutlinedIcon from "@ant-design/icons/DeleteOutlined";
import EditOutlinedIcon from "@ant-design/icons/EditOutlined";
import {
  useDeleteTaskMutation,
  useToggleTaskMutation,
  type Task,
} from "@/app/services/api";
import React from "react";
interface TaskItemProps {
  task: Task;
}

function TaskItem({ task }: TaskItemProps) {
  const [open, setOpen] = React.useState(false);
  const [toggleTask, { isLoading }] = useToggleTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const labelId = `checkbox-list-label-${task._id}`;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    deleteTask(task._id);
    setOpen(false);
  };

  return (
    <ListItem
      key={task._id}
      secondaryAction={
        <>
          <IconButton aria-label="edit">
            <EditOutlinedIcon />
          </IconButton>
          <IconButton edge="end" aria-label="delete" onClick={handleClickOpen}>
            <DeleteOutlinedIcon />
          </IconButton>
        </>
      }
      disablePadding
    >
      <ListItemButton disableRipple role={undefined} dense>
        <ListItemIcon>
          <Checkbox
            id={`checkbox-${task._id}`}
            edge="start"
            checked={task.completed}
            tabIndex={-1}
            disableRipple
            disabled={isLoading}
            onChange={() => toggleTask(task._id)}
            inputProps={{ "aria-labelledby": labelId }}
          />
        </ListItemIcon>
        <ListItemText id={labelId} primary={task.title} />
      </ListItemButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Task"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </ListItem>
  );
}

export default TaskItem;
