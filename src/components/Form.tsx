import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { selectTaskState, setCurrentTask } from "../redux/tasks/taskSlice"
import {
  addTask,
  deleteTask,
  type ITask,
  type Task,
  updateTask,
} from "../redux/tasks/taskThunk"

function Form() {
  const dispatch = useAppDispatch()
  const { currentTask, tasks, loading } = useAppSelector(selectTaskState)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const randomNum = Math.random().toString(36).substring(7)
    dispatch(
      addTask({
        completed: true,
        title: `task description ${randomNum}`,
        description: `task description ${randomNum}`,
        labels: [],
        dueDate: new Date().toISOString(),
      }),
    )
  }

  const handleDelete = (id: string) => {
    dispatch(deleteTask(id))
  }

  const handleSelect = (task: ITask) => {
    dispatch(setCurrentTask(task))
  }

  const handleClose = () => {
    dispatch(setCurrentTask(null))
  }

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    dispatch(
      updateTask({
        id: currentTask!.id!,
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        completed: Boolean(formData.get("completed")),
        labels: (formData.get("labels") as string)
          .split(",")
          .filter(Boolean)
          .map(label => label.trim()),
        dueDate: formData.get("dueDate") as string,
      }),
    )
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <button type="submit">Add task</button>
        </form>
      </div>
      <div>
        {currentTask && (
          <form onSubmit={handleUpdate} key={currentTask.id}>
            <button type="button" onClick={handleClose} disabled={loading}>
              Close
            </button>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={currentTask.title}
            />
            <br />
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              defaultValue={currentTask.description}
            />
            <br />
            <label htmlFor="completed">Completed</label>
            <input
              type="checkbox"
              id="completed"
              name="completed"
              defaultChecked={currentTask.completed}
            />
            <br />
            <label htmlFor="labels">Labels</label>
            <input
              type="text"
              id="labels"
              name="labels"
              defaultValue={currentTask.labels.join(", ")}
            />
            <br />
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="text"
              id="dueDate"
              name="dueDate"
              defaultValue={currentTask.dueDate}
            />
            <br />
            <button type="submit" disabled={loading}>
              Update task
            </button>
          </form>
        )}
      </div>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <span>{task.title}</span>
            <button onClick={() => handleDelete(task.id!)}>Delete</button>
            <button onClick={() => handleSelect(task)}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Form
