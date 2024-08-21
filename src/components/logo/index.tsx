import { Link } from 'react-router-dom';

import type { SxProps } from '@mui/material';
import ButtonBase from '@mui/material/ButtonBase';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import config from '@/config';

import Logo from './LogoMain';

interface LogoSectionProps {
  sx?: SxProps;
  to?: string;
}

const LogoSection = ({ sx, to }: LogoSectionProps) => {
  return (
    <ButtonBase disableRipple component={Link} to={!to ? config.defaultPath : to} sx={sx}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Logo />
        <Chip
          label={import.meta.env.VITE_APP_VERSION}
          variant="outlined"
          size="small"
          color="secondary"
          sx={{ mt: 0.5, ml: 1, fontSize: '0.725rem', height: 20, '& .MuiChip-label': { px: 0.5 } }}
        />
      </Stack>
    </ButtonBase>
  );
};

export default LogoSection;
