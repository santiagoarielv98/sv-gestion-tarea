import List from "@mui/material/List"
import Header from "../../components/Header"
import TaskForm from "../../components/TaskForm"
import TaskItem from "../../components/TaskItem"
import { useAppSelector } from "../../redux/hooks"
import { selectLabelState } from "../../redux/labels/labelSlice"
import { selectTaskState } from "../../redux/tasks/taskSlice"

function Home() {
  const { labels } = useAppSelector(selectLabelState)
  const { tasks } = useAppSelector(selectTaskState)

  return (
    <div>
      <Header />

      <TaskForm />
      <List>
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </List>
      {/* <pre>{JSON.stringify(tasks, null, 2)}</pre> */}

      <pre>{JSON.stringify(labels, null, 2)}</pre>
    </div>
  )
}

export default Home
