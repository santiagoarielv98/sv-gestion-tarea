import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// material-ui
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// project import
import MainCard from '@/components/MainCard';

export default function Breadcrumbs({ navigation, title, ...others }) {
  const location = useLocation();
  const [main, setMain] = useState();
  const [item, setItem] = useState();

  console.log(location.pathname);

  let mainContent;
  let itemContent;
  let breadcrumbContent = <Typography />;
  let itemTitle = '';

  // items
  if (item && item.type === 'item') {
    console.log('item', item);
    itemTitle = item.title;
    itemContent = (
      <Typography variant="subtitle1" color="textPrimary">
        {itemTitle}
      </Typography>
    );

    // main
    if (item.breadcrumbs !== false) {
      breadcrumbContent = (
        <MainCard border={false} sx={{ mb: 3, bgcolor: 'transparent' }} {...others} content={false}>
          <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={1}>
            <Grid item>
              <MuiBreadcrumbs aria-label="breadcrumb">
                <Typography component={Link} to="/" color="textSecondary" variant="h6" sx={{ textDecoration: 'none' }}>
                  Home
                </Typography>
                {mainContent}
                {itemContent}
              </MuiBreadcrumbs>
            </Grid>
            {title && (
              <Grid item sx={{ mt: 2 }}>
                <Typography variant="h5">{item.title}</Typography>
              </Grid>
            )}
          </Grid>
        </MainCard>
      );
    }
  }

  return breadcrumbContent;
}

Breadcrumbs.propTypes = {
  card: PropTypes.bool,
  custom: PropTypes.bool,
  divider: PropTypes.bool,
  heading: PropTypes.string,
  icon: PropTypes.bool,
  icons: PropTypes.bool,
  links: PropTypes.array,
  maxItems: PropTypes.number,
  rightAlign: PropTypes.bool,
  separator: PropTypes.any,
  title: PropTypes.bool,
  titleBottom: PropTypes.bool,
  sx: PropTypes.any,
  others: PropTypes.any,
  navigation: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        type: PropTypes.string,
        url: PropTypes.string,
        icon: PropTypes.node,
        children: PropTypes.array
      })
    )
  })
};
