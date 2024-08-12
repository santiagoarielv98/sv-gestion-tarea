import { RouterProvider } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useVerifySessionQuery } from "./app/services/auth";
import { routes } from "./routes";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";

const defaultTheme = createTheme();

function App() {
  const { isLoading } = useVerifySessionQuery();

  const loading = (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );

  if (isLoading) {
    return loading;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <React.Suspense fallback={loading}>
        <RouterProvider router={routes} />
      </React.Suspense>
    </ThemeProvider>
  );
}

export default App;
