import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import Logo from '@/components/logo/LogoMain';
import { DialogProvider } from '@/contexts/dialog';
import { DialogConfirmProvider } from '@/contexts/dialog/confirm';
import Logout from '@ant-design/icons/LogoutOutlined';
import DashboardOutlined from '@ant-design/icons/DashboardOutlined';
import MenuOutlined from '@ant-design/icons/MenuOutlined';
import MuiAppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import { styled, useTheme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from 'react';
import { Outlet } from 'react-router';

const drawerWidth = 280;

function ResponsiveDrawer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = React.useState(!isMobile);
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
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <DashboardOutlined />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

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
          <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
              variant="temporary"
              open={open}
              onTransitionEnd={handleDrawerTransitionEnd}
              onClose={handleDrawerClose}
              ModalProps={{
                keepMounted: true // Better open performance on mobile.
              }}
              sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
              }}
            >
              {drawer}
            </Drawer>
            <Drawer
              variant="persistent"
              sx={{
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
              }}
              open={open}
            >
              {drawer}
            </Drawer>
          </Box>
          <Main
            open={open}
            // component="main"
            // sx={{
            //   flexGrow: 1,
            //   p: 3,

            //   width: { sm: `calc(100% - ${drawerWidth}px)` }
            // }}
          >
            <Toolbar />
            <Outlet />
          </Main>
        </Box>
      </DialogProvider>
    </DialogConfirmProvider>
  );
}

export default ResponsiveDrawer;

function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <Button color="inherit" onClick={handleClick} sx={{ textTransform: 'none' }} startIcon={<Avatar />}>
            <Typography color="inherit" sx={{ display: { xs: 'none', md: 'block' } }}>
              John Doe
            </Typography>
          </Button>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  [theme.breakpoints.up('sm')]: {
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 0
    })
  }
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.divider}`,
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  [theme.breakpoints.up('sm')]: {
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    })
  }
}));
