import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';

import Logo from '@/components/logo';

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Grid container direction="column" justifyContent="flex-start" sx={{ minHeight: '100vh' }}>
      <Grid item xs={12}>
        <Toolbar>
          <Logo />
        </Toolbar>
      </Grid>
      <Grid item xs={12}>
        <Container maxWidth="xs" sx={{ my: 8 }}>
          {children}
        </Container>
      </Grid>
    </Grid>
  );
}
