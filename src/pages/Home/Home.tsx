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
import EditTaskForm from "../../components/EditTaskForm"
import moment from "moment"

export default function Home() {
  const [data, setData] = React.useState<CreateTask[]>([])
  const [openDelete, setOpenDelete] = React.useState(false)
  const [selectedTask, setSelectedTask] = React.useState<CreateTask | null>(
    null,
  )
  const [openEdit, setOpenEdit] = React.useState(false)

  const handleOpen = (task: CreateTask) => {
    setOpenDelete(true)
    setSelectedTask(task)
  }

  const handleClose = () => {
    setOpenDelete(false)
    setSelectedTask(null)
  }

  const handleDelete = () => {
    if (selectedTask && selectedTask.id) {
      deleteTask(selectedTask.id)
      handleClose()
    }
  }

  const handleEdit = (task: CreateTask) => {
    setSelectedTask(task)
    setOpenEdit(true)
  }

  const handleCloseEdit = () => {
    setOpenEdit(false)
    setSelectedTask(null)
  }

  React.useEffect(() => {
    const unsub = onSnapshot(taskCollection, snapshot => {
      const tasks: CreateTask[] = []

      snapshot.forEach(doc =>
        tasks.push({
          id: doc.id,
          ...doc.data(),
          dueDate: moment(doc.data().dueDate.toDate()),
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
            <ListItemText
              primary={task.title}
              secondary={task.description}
              onClick={() => handleEdit(task)}
            />
          </ListItem>
        ))}
      </List>
      <Dialog open={openDelete} onClose={handleClose}>
        <DialogContent>
          <h1>{selectedTask?.title}</h1>
          <p>{selectedTask?.description}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
      {selectedTask && (
        <EditTaskForm
          task={selectedTask}
          open={openEdit}
          onClose={handleCloseEdit}
        />
      )}
    </div>
  )
}
