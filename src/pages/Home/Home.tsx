import {
  selectUser,
  signIn,
  signOutUser,
  signUp,
} from "../../redux/auth/authSlice"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"

const credentials = {
  email: "test@test.com",
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
  const user = useAppSelector(selectUser)

  return (
    <div>
      <button
        // disabled
        onClick={() => dispatch(signUp(generateCredentials()))}
      >
        Sign up
      </button>
      <button onClick={() => dispatch(signOutUser())}>Sign out</button>
      <button onClick={() => dispatch(signIn(credentials))}>Sign in</button>

      <div>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </div>
  )
}

export default Home
