import '@mui/material';
import '@mui/material/styles/createPalette';

declare module '@mui/material/styles' {
  interface Theme {
    customShadows: {
      z1: string;
      primary: string;
      secondary: string;
      info: string;
      success: string;
      warning: string;
      error: string;
      primaryButton: string;
      secondaryButton: string;
      infoButton: string;
      successButton: string;
      warningButton: string;
      errorButton: string;
    };
  }
  interface PaletteColor {
    lighter?: string;
    darker?: string;
    300?: string;
  }

  interface SimplePaletteColorOptions {
    lighter?: string;
    darker?: string;
  }
}

declare module '@mui/material' {
  interface Color {
    A800: string;
  }
}
