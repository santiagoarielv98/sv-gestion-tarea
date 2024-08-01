import TaskForm from "../../components/TaskForm"
import { selectUserState } from "../../redux/auth/authSlice"
import { signIn, signOutUser, signUp } from "../../redux/auth/authThunk"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { selectLabelState } from "../../redux/labels/labelSlice"
import { selectTaskState } from "../../redux/tasks/taskSlice"

const credentials = {
  email: "5ewm2w@test.com",
  password: "test1234",
}

const generateRandomEmail = () => {
  return Math.random().toString(36).substring(7) + "@test.com"
}

const generateCredentials = () => {
  return {
    email: generateRandomEmail(),
    password: "test1234",
  }
}

function Home() {
  const dispatch = useAppDispatch()
  const { user, loading } = useAppSelector(selectUserState)
  const { labels } = useAppSelector(selectLabelState)
  const {tasks} = useAppSelector(selectTaskState)

  return (
    <div>
      <button onClick={() => dispatch(signUp(generateCredentials()))}>
        Sign up
      </button>
      <button onClick={() => dispatch(signOutUser())}>Sign out</button>
      <button onClick={() => dispatch(signIn(credentials))}>Sign in</button>

      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <pre>{JSON.stringify(user, null, 2)}</pre>
        )}
      </div>
      <TaskForm />
      <pre>{JSON.stringify(tasks, null, 2)}</pre>

      <pre>{JSON.stringify(labels, null, 2)}</pre>
    </div>
  )
}

export default Home
