import * as React from "react";
import { Outlet } from "react-router-dom";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Drawer from "./Drawer";
import DrawerHeader from "./DrawerHeader";
import Main from "./Main";
import Navbar from "./Navbar";

export default function ResponsiveDrawer() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  const [open, setOpen] = React.useState(() => isDesktop);

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    if (!isDesktop) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isDesktop]);

  return (
    <>
      <Navbar open={open} onToggle={handleDrawerToggle} />
      <Drawer open={open} onClose={handleDrawerClose} />
      <Main open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </>
  );
}
