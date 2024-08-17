import { Avatar, Stack, Typography } from '@mui/material';

import LogoImg from '@/assets/images/logo.png';

const Logo = () => {
  return (
    <>
      <Stack direction="row" spacing={1} alignItems="center">
        <Avatar src={LogoImg} alt="Logo" />
        <Typography variant="h6" component="h1" color="inherit" noWrap>
          Task Manager
        </Typography>
      </Stack>
    </>
  );
};

export default Logo;
