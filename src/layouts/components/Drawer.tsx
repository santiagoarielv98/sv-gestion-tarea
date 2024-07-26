import Box from "@mui/material/Box"
import MuiDrawer from "@mui/material/Drawer"

import MenuItems from "./MenuItems"
import { drawerWidth } from "../config"

export interface DrawerProps {
  open: boolean
  onClose?: () => void
}

function Drawer(props: DrawerProps) {
  const { open, onClose } = props
  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      aria-label="mailbox folders"
    >
      <MuiDrawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        <MenuItems />
      </MuiDrawer>
      <MuiDrawer
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open={open}
      >
        <MenuItems />
      </MuiDrawer>
    </Box>
  )
}

export default Drawer
