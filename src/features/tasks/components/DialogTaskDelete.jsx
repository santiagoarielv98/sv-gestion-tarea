// material-ui
import Button from '@mui/material/Button';

import { DialogActions, DialogContent, DialogContentText, DialogTitle, Divider } from '@mui/material';
import { useDeleteTaskMutation } from '../taskApi';

// assets

// ============================|| JWT - REGISTER ||============================ //

export default function DialogTaskDelete({ task, closeDialog, onConfirm }) {
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
          Are you sure you want to delete task <strong>Example Task</strong>?
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
