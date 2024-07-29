import { onSnapshot } from "firebase/firestore"
import React from "react"
import {
  type CreateTask,
  deleteTask,
  taskCollection,
} from "../../services/tasks"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import IconButton from "@mui/material/IconButton"
import ListItemText from "@mui/material/ListItemText"
import { DeleteFilled } from "@ant-design/icons"
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import Button from "@mui/material/Button"

export default function Home() {
  const [data, setData] = React.useState<CreateTask[]>([])
  const [open, setOpen] = React.useState(false)
  const [selectedTask, setSelectedTask] = React.useState<CreateTask | null>(
    null,
  )

  const handleOpen = (task: CreateTask) => {
    setOpen(true)
    setSelectedTask(task)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedTask(null)
  }

  const handleDelete = () => {
    if (selectedTask && selectedTask.id) {
      deleteTask(selectedTask.id)
      handleClose()
    }
  }

  React.useEffect(() => {
    const unsub = onSnapshot(taskCollection, snapshot => {
      const tasks: CreateTask[] = []

      snapshot.forEach(doc =>
        tasks.push({
          id: doc.id,
          ...doc.data(),
        } as CreateTask),
      )
      setData(tasks)
    })

    return () => unsub()
  }, [])

  return (
    <div>
      <List>
        {data.map(task => (
          <ListItem
            key={task.id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleOpen(task)}
              >
                <DeleteFilled />
              </IconButton>
            }
          >
            <ListItemText primary={task.title} secondary={task.description} />
          </ListItem>
        ))}
      </List>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <h1>{selectedTask?.title}</h1>
          <p>{selectedTask?.description}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
