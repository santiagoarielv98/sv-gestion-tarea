import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import ListItem from "@mui/material/ListItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import { useAppDispatch } from "../redux/hooks"
import { deleteTask, type Task, updateTask } from "../redux/tasks/taskThunk"
import { DeleteFilled, EditFilled } from "@ant-design/icons"
import { setCurrentTask } from "../redux/tasks/taskSlice"
import { setModalOpen } from "../redux/modal/modalSlice"

function TaskItem({ task }: { task: Task }) {
  const dispatch = useAppDispatch()

  const toggleTask = () => {
    dispatch(updateTask({ ...task, completed: !task.completed }))
  }

  const removeTask = () => {
    dispatch(deleteTask(task.id))
  }

  const editTask = () => {
    dispatch(setCurrentTask(task))
    dispatch(setModalOpen("task"))
  }

  return (
    <ListItem
      secondaryAction={
        <>
          <IconButton onClick={editTask}>
            <EditFilled />
          </IconButton>
          <IconButton edge="end" onClick={removeTask}>
            <DeleteFilled />
          </IconButton>
        </>
      }
      disablePadding
    >
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={task.completed}
          tabIndex={-1}
          disableRipple
          onClick={toggleTask}
        />
      </ListItemIcon>
      <ListItemText primary={task.title} />
    </ListItem>
  )
}

export default TaskItem
