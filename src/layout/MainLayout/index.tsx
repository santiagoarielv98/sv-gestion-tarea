import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { DialogProvider } from '@/contexts/dialog';
import { DialogConfirmProvider } from '@/contexts/dialog/confirm';
import { selectDrawerOpen, setDrawerOpen, toggleDrawer } from '@/features/layout/layoutSlice';
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

function ResponsiveDrawer() {
  const dispatch = useAppDispatch();
  const open = useAppSelector(selectDrawerOpen);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    dispatch(toggleDrawer());
  };

  React.useEffect(() => {
    if (isMobile) {
      dispatch(setDrawerOpen(false));
    } else {
      dispatch(setDrawerOpen(true));
      // setOpen(true);
    }
  }, [isMobile, dispatch]);

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
          <Drawer />
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
