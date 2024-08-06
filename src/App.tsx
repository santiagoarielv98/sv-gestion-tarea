import { RouterProvider } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useVerifySessionQuery } from "./features/api/apiSlice";
import { routes } from "./routes";

const defaultTheme = createTheme();

function App() {
  const { isLoading } = useVerifySessionQuery();

  if (isLoading) {
    return null;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <RouterProvider router={routes} />
    </ThemeProvider>
  );
}

export default App;
