import { RouterProvider } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useVerifySessionQuery } from "./features/api/apiSlice";
import { routes } from "./routes";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const defaultTheme = createTheme();

function App() {
  const { isLoading } = useVerifySessionQuery();
  if (isLoading) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />

      <RouterProvider router={routes} />
    </ThemeProvider>
  );
}

export default App;
