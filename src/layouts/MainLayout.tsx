import * as React from "react";
import { Outlet } from "react-router-dom";

import Main from "@/components/Main";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import useMediaQuery from "@mui/material/useMediaQuery";

function MainLayout() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  const [open, setOpen] = React.useState(() => isDesktop);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setOpen(!open);
    }
  };

  React.useEffect(() => {
    setOpen(isDesktop);
  }, [isDesktop]);

  return (
    <>
      <Navbar open={open} onToggle={handleDrawerToggle} />
      <Sidebar
        open={open}
        onDrawerClose={handleDrawerClose}
        onDrawerTransitionEnd={handleDrawerTransitionEnd}
        onDrawerToggle={handleDrawerToggle}
      />
      <Main open={open}>
        <Toolbar />
        <Container>
          <Outlet />
        </Container>
      </Main>
    </>
  );
}

export default MainLayout;
