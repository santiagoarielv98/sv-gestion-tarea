import { useMemo } from "react"
import { RouterProvider } from "react-router-dom"

import CssBaseline from "@mui/material/CssBaseline"
import GlobalStyles from "@mui/material/GlobalStyles"
import { createTheme, ThemeProvider } from "@mui/material/styles"

import React from "react"
import { auth } from "./firebase"
import useSettings from "./hooks/useTheme"
import { setStatus, setUser } from "./redux/auth/authSlice"
import { useAppDispatch } from "./redux/hooks"
import { routes } from "./routes"

const App = () => {
  const dispatch = useAppDispatch()
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

  React.useEffect(() => {
    dispatch(setStatus("loading"))
    const authUnsubscribe = auth.onAuthStateChanged(user => {
      const _user = user ? { email: user.email!, uid: user.uid } : null
      dispatch(setUser(_user))
      dispatch(setStatus("succeeded"))
    })
    return () => {
      authUnsubscribe()
    }
  }, [dispatch])

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
