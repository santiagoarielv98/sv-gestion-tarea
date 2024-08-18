// material-ui
import MuiAvatar from '@mui/material/Avatar';
import { styled, useTheme } from '@mui/material/styles';

const AvatarStyle = styled(MuiAvatar, {
  shouldForwardProp: (prop) => prop !== 'color' && prop !== 'type' && prop !== 'size'
})(({ theme, color, type, size }) => ({
  borderColor: theme.palette.background.default
}));

export default function Avatar({ children, color = 'primary', type, size = 'md', ...others }) {
  const theme = useTheme();

  return (
    <AvatarStyle theme={theme} color={color} type={type} size={size} {...others}>
      {children}
    </AvatarStyle>
  );
}
