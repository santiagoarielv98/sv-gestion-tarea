import AppBar from "@mui/material/AppBar"
import IconButton from "@mui/material/IconButton"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"

import { MenuOutlined as MenuIcon } from "@ant-design/icons"
import useThemeSettings from "../hooks/useTheme"
import Button from "@mui/material/Button"
import { useAppDispatch } from "../redux/hooks"
import { openModal } from "../redux/modal/modalSlice"

export default function Header() {
  const dispatch = useAppDispatch()
  const { toggleDrawerOpen } = useThemeSettings()

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
        <Button onClick={() => dispatch(openModal("addTask"))}>Add Task</Button>
        <Typography variant="h6" noWrap component="div">
          Responsive drawer
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
