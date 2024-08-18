import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material/styles';

export default function ThemeCustomization({ children }) {
  const themes = createTheme();

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
