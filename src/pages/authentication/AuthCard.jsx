import PropTypes from 'prop-types';

// material-ui
import Box from '@mui/material/Box';

// project import
import MainCard from '@/components/MainCard';



export default function AuthCard({ children, ...other }) {
  return (
    <MainCard
      sx={{ maxWidth: { xs: 400, lg: 475 }, margin: { xs: 2.5, md: 3 }, '& > *': { flexGrow: 1, flexBasis: '50%' } }}
      content={false}
      {...other}
      border={false}
      boxShadow
      shadow={(theme) => theme.shadows[5]}
    >
      <Box sx={{ p: { xs: 2, sm: 3, md: 4, xl: 5 } }}>{children}</Box>
    </MainCard>
  );
}

AuthCard.propTypes = { children: PropTypes.node, other: PropTypes.any };
