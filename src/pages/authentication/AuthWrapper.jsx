import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Logo from '@/components/logo';
import Stack from '@mui/material/Stack';
import { Card, Container, Paper, Toolbar } from '@mui/material';

export default function AuthWrapper({ children }) {
  return (
    <Stack minHeight="100vh">
      <Toolbar>
        <Logo />
      </Toolbar>
      <Container
        sx={{
          flexGrow: 1,
          my: 8
        }}
        maxWidth="sm"
      >
        <Paper
          sx={{
            p: 4
          }}
        >
          {children}
        </Paper>
      </Container>
    </Stack>
  );
}
