import { useMemo } from "react"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import { selectColorMode, toggleColorMode } from "./features/themes/themeSlice"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import GlobalStyles from "@mui/material/GlobalStyles"
import CssBaseline from "@mui/material/CssBaseline"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"

const App = () => {
  const dispatch = useAppDispatch()
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
        <Box
          sx={{
            bgcolor: "background.default",
            color: "text.primary",
            height: "100%",
          }}
        >
          <Button
            aria-label="Toggle dark mode"
            onClick={() => dispatch(toggleColorMode())}
            style={{
              backgroundColor: colorMode === "dark" ? "#282c34" : "#fff",
              color: colorMode === "dark" ? "#fff" : "#282c34",
            }}
          >
            {colorMode === "dark" ? "🌞" : "🌜"}
          </Button>
        </Box>
      </ThemeProvider>
    </>
  )
}

export default App
