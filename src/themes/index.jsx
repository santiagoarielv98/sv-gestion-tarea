import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
export default function ThemeCustomization({ children }) {
  const themes = createTheme();

  return (
    <StyledEngineProvider injectFirst>
      <GlobalStyles
        styles={{
          'html, body, #app': {
            height: '100%'
          }
        }}
      />
      <ThemeProvider theme={themes}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
