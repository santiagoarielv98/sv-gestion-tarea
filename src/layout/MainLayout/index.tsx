import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import MenuOutlined from '@ant-design/icons/MenuOutlined';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from 'react';
import { Outlet } from 'react-router';
import AccountMenu from './components/AccountMenu';
import AppBar from './components/AppBar';
import Drawer from './components/Drawer';
import Main from './components/Main';
import { DialogConfirmProvider } from '@/features/dialog/ConfirmDialog';
import { DialogProvider } from '@/features/dialog/MainDialog';

function ResponsiveDrawer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = React.useState(() => !isMobile);
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
    if (isMobile) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isMobile]);

  return (
    <DialogConfirmProvider>
      <DialogProvider>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar color="transparent" elevation={0} position="fixed" open={open}>
            <Toolbar>
              <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle}>
                <MenuOutlined />
              </IconButton>
              <Box sx={{ flexGrow: 1 }} />
              <AccountMenu />
            </Toolbar>
          </AppBar>
          <Drawer
            open={open}
            handleDrawerClose={handleDrawerClose}
            handleDrawerTransitionEnd={handleDrawerTransitionEnd}
          />
          <Main open={open}>
            <Toolbar />
            <Outlet />
          </Main>
        </Box>
      </DialogProvider>
    </DialogConfirmProvider>
  );
}

export default ResponsiveDrawer;
