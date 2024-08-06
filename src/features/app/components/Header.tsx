import MenuIcon from "@ant-design/icons/MenuOutlined";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { selectUser } from "../../auth/authSlice";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { useLogoutMutation } from "../../api/apiSlice";

export default function Header() {
  const user = useAppSelector(selectUser);
  const [logout, { isLoading }] = useLogoutMutation();

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          News
        </Typography>
        {user ? (
          <Button
            disabled={isLoading}
            color="inherit"
            component={Link}
            to="/auth/sign-out"
            onClick={() => logout()}
          >
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
