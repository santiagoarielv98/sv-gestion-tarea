import Box from "@mui/material/Box"
import MuiDrawer from "@mui/material/Drawer"

import { drawerWidth } from "../constants/config"
import useTheme from "../hooks/useTheme"
import MenuItems from "./MenuItems"

function Drawer() {
  const { open, setDrawer } = useTheme()

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      aria-label="mailbox folders"
    >
      <MuiDrawer
        variant="temporary"
        open={open}
        onClose={() => setDrawer(false)}
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
        variant="persistent"
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
