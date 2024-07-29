import * as React from "react"

import useMediaQuery from "@mui/material/useMediaQuery"

import Box from "@mui/material/Box"
import { useTheme } from "@mui/material/styles"
import Toolbar from "@mui/material/Toolbar"

import { Outlet } from "react-router-dom"
import Drawer from "../components/Drawer"
import Header from "../components/Header"
import Main from "../components/Main"
import useSettings from "../hooks/useTheme"

export default function AppLayout() {
  const theme = useTheme()
  const { open, setDrawer } = useSettings()

  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  React.useEffect(() => {
    if (isMobile) {
      setDrawer(false)
    } else {
      setDrawer(true)
    }
  }, [isMobile, setDrawer])

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <Header />
      <Drawer />
      <Main open={open}>
        <Toolbar />
        <Outlet />
      </Main>
    </Box>
  )
}
