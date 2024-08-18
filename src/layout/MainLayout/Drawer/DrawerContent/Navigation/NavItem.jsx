import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link, matchPath, useLocation } from 'react-router-dom';

// material-ui
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

// project import

export default function NavItem({ item, level }) {
  const theme = useTheme();

  let itemTarget = '_self';
  if (item.target) {
    itemTarget = '_blank';
  }
  let listItemProps = {
    component: forwardRef((props, ref) => <Link ref={ref} {...props} to={item.url} target={itemTarget} />)
  };
  if (item?.external) {
    listItemProps = { component: 'a', href: item.url, target: itemTarget };
  }

  const Icon = item.icon;
  const itemIcon = item.icon ? <Icon style={{ fontSize: '1rem' }} /> : false;

  const { pathname } = useLocation();
  const isSelected = false;

  const textColor = 'text.primary';
  const iconSelectedColor = 'primary.main';

  return (
    <ListItemButton
      {...listItemProps}
      disabled={item.disabled}
      selected={isSelected}
      sx={{
        zIndex: 1201,
        pl: `${level * 28}px`,
        py: 1,
        '&:hover': {
          bgcolor: 'primary.lighter'
        },
        '&.Mui-selected': {
          bgcolor: 'primary.lighter',
          borderRight: `2px solid ${theme.palette.primary.main}`,
          color: iconSelectedColor,
          '&:hover': {
            color: iconSelectedColor,
            bgcolor: 'primary.lighter'
          }
        }
      }}
    >
      {itemIcon && (
        <ListItemIcon
          sx={{
            minWidth: 28,
            color: isSelected ? iconSelectedColor : textColor
          }}
        >
          {itemIcon}
        </ListItemIcon>
      )}
      {
        <ListItemText
          primary={
            <Typography variant="h6" sx={{ color: isSelected ? iconSelectedColor : textColor }}>
              {item.title}
            </Typography>
          }
        />
      }
    </ListItemButton>
  );
}

NavItem.propTypes = { item: PropTypes.object, level: PropTypes.number };
