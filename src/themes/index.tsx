import { useMemo } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import type { ThemeOptions } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import componentsOverride from './overrides';
import Palette from './palette';
import CustomShadows from './shadows';
import Typography from './typography';

export default function ThemeCustomization({ children }: { children: React.ReactNode }) {
  const theme = Palette('light');

  const themeTypography = Typography(`'Roboto', sans-serif`);
  const themeCustomShadows = useMemo(() => CustomShadows(theme), [theme]);

  const themeOptions = useMemo(
    () =>
      ({
        breakpoints: {
          values: {
            xs: 0,
            sm: 768,
            md: 1024,
            lg: 1266,
            xl: 1440
          }
        },
        direction: 'ltr',
        mixins: {
          toolbar: {
            minHeight: 60,
            paddingTop: 8,
            paddingBottom: 8
          }
        },
        palette: theme.palette,
        customShadows: themeCustomShadows,
        typography: themeTypography
      }) as ThemeOptions,
    [theme, themeTypography, themeCustomShadows]
  );

  const themes = createTheme(themeOptions);
  themes.components = componentsOverride(themes);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
