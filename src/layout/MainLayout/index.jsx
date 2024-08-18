import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

// material-ui
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';

// project import
import Loader from '@/components/Loader';
import Drawer from './Drawer';
import Header from './Header';

import { handlerDrawerOpen, useGetMenuMaster } from '@/api/menu';
import { DialogProvider } from '@/contexts/dialog';
import { DialogConfirmProvider } from '@/contexts/dialog/confirm';

export default function MainLayout() {
  const { menuMasterLoading } = useGetMenuMaster();
  const downXL = useMediaQuery((theme) => theme.breakpoints.down('xl'));

  useEffect(() => {
    handlerDrawerOpen(!downXL);
  }, [downXL]);

  if (menuMasterLoading) return <Loader />;

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <DialogConfirmProvider>
        <DialogProvider>
          <Header />
          <Drawer />
          <Box component="main" sx={{ width: 'calc(100% - 260px)', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
            <Toolbar />
            <Outlet />
          </Box>
        </DialogProvider>
      </DialogConfirmProvider>
    </Box>
  );
}
