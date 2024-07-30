import { DeleteFilled, EditFilled } from "@ant-design/icons"
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import IconButton from "@mui/material/IconButton"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import {
  collection,
  onSnapshot,
  query,
  type Unsubscribe,
  where,
} from "firebase/firestore"
import moment from "moment"
import React from "react"
import EditTaskForm from "../../components/EditTaskForm"
import { auth, db } from "../../firebase"
import { type Label, labelCollection } from "../../services/label"
import {
  type CreateTask,
  deleteTask,
  taskCollection,
  toggleTaskCompletion,
} from "../../services/tasks"

export default function Home() {
  const [data, setData] = React.useState<CreateTask[]>([])
  const [labels, setLabels] = React.useState<Label[]>([])
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
    let unsubscribeLabels: Unsubscribe

    auth.onAuthStateChanged(user => {
      if (!user) {
        return
      }
      const q = query(labelCollection, where("userId", "==", user.uid))
      unsubscribeLabels = onSnapshot(q, snapshot => {
        const labels: Label[] = []

        snapshot.forEach(doc =>
          labels.push({ id: doc.id, ...doc.data() } as Label),
        )
        setLabels(labels)
      })
    })

    return () => {
      unsubscribeLabels?.()
    }
  }, [])

  React.useEffect(() => {
    let unsubscribeTasks: Unsubscribe
    auth.onAuthStateChanged(user => {
      if (!user) {
        return
      }
      const q = query(taskCollection, where("userId", "==", user.uid))

      unsubscribeTasks = onSnapshot(q, snapshot => {
        const tasks: CreateTask[] = []

        snapshot.forEach(doc =>
          tasks.push({
            id: doc.id,
            ...doc.data(),
            dueDate: moment(doc.data().dueDate.toDate()),
            labels: labels.filter(label =>
              doc.data().labels?.includes(label.id),
            ),
          } as CreateTask),
        )
        setData(tasks)
      })
    })

    return () => {
      unsubscribeTasks?.()
    }
  }, [labels])

  return (
    <div>
      <List>
        {data.map(task => (
          <ListItem
            key={task.id}
            secondaryAction={
              <>
                <IconButton aria-label="edit" onClick={() => handleEdit(task)}>
                  <EditFilled />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleOpen(task)}
                >
                  <DeleteFilled />
                </IconButton>
              </>
            }
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={Boolean(task.isCompleted)}
                tabIndex={-1}
                disableRipple
                onClick={() => {
                  task.id && toggleTaskCompletion(task.id)
                }}
              />
            </ListItemIcon>
            <ListItemText primary={task.title} secondary={task.description} />
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
