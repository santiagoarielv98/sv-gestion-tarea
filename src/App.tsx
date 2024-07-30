import { useMemo } from "react"
import { RouterProvider, useNavigate } from "react-router-dom"

import CssBaseline from "@mui/material/CssBaseline"
import GlobalStyles from "@mui/material/GlobalStyles"
import { createTheme, ThemeProvider } from "@mui/material/styles"

import useSettings from "./hooks/useTheme"
import { routes } from "./routes"
import { auth } from "./firebase"
import React from "react"
import { type User } from "firebase/auth"

const App = () => {
  const [user, setUser] = React.useState<User | null>(null)
  const { colorMode } = useSettings()
  // const navigate = useNavigate()

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: colorMode,
        },
      }),
    [colorMode],
  )

  React.useEffect(() => {
    const unsub = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user)
      } else {
        // navigate("/login")
        setUser(null)
      }
    })
    return () => {
      unsub()
    }
  }, [])

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
