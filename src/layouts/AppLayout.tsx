import * as React from "react"

import useMediaQuery from "@mui/material/useMediaQuery"

import Box from "@mui/material/Box"
import { useTheme } from "@mui/material/styles"
import Toolbar from "@mui/material/Toolbar"

import { Outlet } from "react-router-dom"
import Drawer from "../components/Drawer"
import Header from "../components/Header"
import Main from "../components/Main"

export default function AppLayout() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [open, setOpen] = React.useState(!isMobile)

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleDrawerToggle = () => {
    setOpen(!open)
  }

  React.useEffect(() => {
    if (isMobile) {
      setOpen(false)
    } else {
      setOpen(true)
    }
  }, [isMobile])

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <Header onDrawerToggle={handleDrawerToggle} />
      <Drawer open={open} onClose={handleDrawerClose} />
      <Main open={open}>
        <Toolbar />
        <Outlet />
      </Main>
    </Box>
  )
}
