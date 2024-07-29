import { useMemo } from "react"
import { RouterProvider } from "react-router-dom"

import CssBaseline from "@mui/material/CssBaseline"
import GlobalStyles from "@mui/material/GlobalStyles"
import { createTheme, ThemeProvider } from "@mui/material/styles"

import useSettings from "./hooks/useTheme"
import { routes } from "./routes"

const App = () => {
  const { colorMode } = useSettings()

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: colorMode,
        },
      }),
    [colorMode],
  )

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles
        styles={{
          ":root": {
            scrollBehavior: "smooth",
            textRendering: "optimizeLegibility",
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
            textWrap: "balance",
          },
          "html,body,#root": {
            height: "100%",
            maxWidth: "100%",
          },
        }}
      />
      <CssBaseline />
      <RouterProvider router={routes} />
    </ThemeProvider>
  )
}

export default App
