// material-ui
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';

// project import
import MobileSection from './MobileSection';
import Profile from './Profile';


export default function HeaderContent() {
  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <>
      {/* {!downLG && <Search />} */}
      <Box sx={{ width: '100%', ml: 1 }} />
      {!downLG && <Profile />}
      {downLG && <MobileSection />}
    </>
  );
}
