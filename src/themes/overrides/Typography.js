/**
 *
 * @returns {import('@mui/material').Components}
 */
export default function Typography() {
  return {
    MuiTypography: {
      styleOverrides: {
        gutterBottom: {
          marginBottom: 12
        }
      }
    }
  };
}
