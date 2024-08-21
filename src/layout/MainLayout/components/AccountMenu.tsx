import Box from '@mui/material/Box';

import { selectUser } from '@/features/auth/authSlice';
import useAuth from '@/hooks/useAuth';
import Logout from '@ant-design/icons/LogoutOutlined';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useSelector } from 'react-redux';

function AccountMenu() {
  const user = useSelector(selectUser);
  const { logout } = useAuth();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Button
          color="inherit"
          onClick={handleClick}
          sx={{ textTransform: 'none' }}
          startIcon={
            <Avatar
              sx={{
                width: 32,
                height: 32
              }}
            />
          }
        >
          <Typography color="inherit" sx={{ display: { xs: 'none', md: 'block' } }}>
            {user?.displayName}
          </Typography>
        </Button>
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
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default AccountMenu;
