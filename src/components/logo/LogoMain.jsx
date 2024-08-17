import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

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
