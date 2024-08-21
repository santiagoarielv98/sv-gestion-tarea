import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import { Link, useLocation } from 'react-router-dom';

import Logo from '@/components/logo/LogoMain';
import { drawerWidth } from '@/config';

import { menuItems } from '../menu-items';

interface DrawerProps {
  open: boolean;
  handleDrawerClose: () => void;
  handleDrawerTransitionEnd: () => void;
}

function Drawer({ open, handleDrawerClose, handleDrawerTransitionEnd }: DrawerProps) {
  const theme = useTheme();
  const { pathname } = useLocation();

  const drawer = (
    <div>
      <Toolbar>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Logo />
          <Chip label={import.meta.env.VITE_APP_VERSION} color="primary" size="small" />
        </Stack>
      </Toolbar>
      <Divider />
      <List subheader={<ListSubheader component="div">Navigation</ListSubheader>}>
        {menuItems.map((item) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={pathname === item.path}
              sx={{
                '&.Mui-selected': {
                  borderRight: `4px solid ${theme.palette.primary.main}`
                }
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
  return (
    <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
      <MuiDrawer
        variant="temporary"
        open={open}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
        }}
      >
        {drawer}
      </MuiDrawer>
      <MuiDrawer
        variant="persistent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
        }}
        open={open}
      >
        {drawer}
      </MuiDrawer>
    </Box>
  );
}

export default Drawer;
