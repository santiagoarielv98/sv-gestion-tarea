import AppBar from "@mui/material/AppBar"
import IconButton from "@mui/material/IconButton"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"

import { MenuOutlined as MenuIcon } from "@ant-design/icons"

export interface HeaderProps {
  onDrawerToggle?: () => void
}

export default function Header(props: HeaderProps) {
  const { onDrawerToggle } = props
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: theme => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onDrawerToggle}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Responsive drawer
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
