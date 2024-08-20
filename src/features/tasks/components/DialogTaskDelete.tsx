import Button from '@mui/material/Button';

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';

import { useDeleteTaskMutation } from '../taskApi';

interface DialogTaskDeleteProps {
  task: Task;
  closeDialog: () => void;
  onConfirm: () => void;
}

export default function DialogTaskDelete({ task, closeDialog, onConfirm }: DialogTaskDeleteProps) {
  const [deleteTask] = useDeleteTaskMutation();

  const handleDelete = async () => {
    await deleteTask(task._id);
    closeDialog();
    onConfirm();
  };
  return (
    <>
      <DialogTitle>Delete Task</DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete task <strong>{task.title}</strong>?
        </DialogContentText>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button color="primary" onClick={closeDialog}>
          Cancel
        </Button>
        <Button color="primary" variant="contained" onClick={handleDelete}>
          Delete
        </Button>
      </DialogActions>
    </>
  );
}
