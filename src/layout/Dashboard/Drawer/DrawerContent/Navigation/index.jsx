// material-ui
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project import
import NavGroup from './NavGroup';
import menuItem from '@/menu-items';

export default function Navigation() {
  const navGroups = menuItem.items.map((item) => <NavGroup key={item.id} item={item} />);

  return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
}
