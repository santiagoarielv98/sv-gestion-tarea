import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { useLogoutMutation } from "../../api/apiSlice";
import { selectUser } from "../../auth/authSlice";

export default function Header() {
  const user = useAppSelector(selectUser);
  const [logout, { isLoading }] = useLogoutMutation();

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit">Create Task</Button>
        <Box sx={{ flexGrow: 1 }} />
        {user ? (
          <Button disabled={isLoading} color="inherit" onClick={() => logout()}>
            Logout
          </Button>
        ) : (
          <Button color="inherit" component={Link} to="/auth/sign-in">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
