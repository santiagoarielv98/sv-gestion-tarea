import AppBar from "@mui/material/AppBar"
import IconButton from "@mui/material/IconButton"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"

import { MenuOutlined as MenuIcon } from "@ant-design/icons"
import useSettings from "../hooks/useTheme"
import AddTaskForm from "./AddTaskForm"

export default function Header() {
  const { toggleDrawerOpen } = useSettings()

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: theme => ({
          md: theme.zIndex.drawer + 1,
          xs: theme.zIndex.appBar,
        }),
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={toggleDrawerOpen}
        >
          <MenuIcon />
        </IconButton>
        <AddTaskForm />
        <Typography variant="h6" noWrap component="div">
          Responsive drawer
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
