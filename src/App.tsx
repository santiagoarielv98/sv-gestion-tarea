import CssBaseline from "@mui/material/CssBaseline"
import GlobalStyles from "@mui/material/GlobalStyles"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useMemo } from "react"
import { useAppSelector } from "./app/hooks"
import { selectColorMode } from "./features/themes/themeSlice"
import AppLayout from "./layouts/AppLayout"

// import InboxIcon from '@mui/icons-material/MoveToInbox';

const App = () => {
  const colorMode = useAppSelector(selectColorMode)
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
    <>
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
      <ThemeProvider theme={theme}>
        <AppLayout />
      </ThemeProvider>
    </>
  )
}

export default App
