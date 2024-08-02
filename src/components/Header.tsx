import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import Stack from "@mui/material/Stack"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { setModalOpen } from "../redux/modal/modalSlice"
import { signIn, signOutUser } from "../redux/auth/authThunk"
import { selectUserState } from "../redux/auth/authSlice"

const credentials = {
  email: "5ewm2w@test.com",
  password: "test1234",
}

function Header() {
  const { user } = useAppSelector(selectUserState)

  const dispatch = useAppDispatch()

  const openModal = () => {
    dispatch(setModalOpen("task"))
  }

  return (
    <Container>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" onClick={openModal}>
          Add Task
        </Button>
        {user ? (
          <Button variant="contained" onClick={() => dispatch(signOutUser())}>
            Logout
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={() => dispatch(signIn(credentials))}
          >
            Login
          </Button>
        )}
      </Stack>
    </Container>
  )
}

export default Header
