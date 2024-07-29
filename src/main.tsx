import React from "react"
import { createRoot } from "react-dom/client"

import { Provider } from "react-redux"

import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"

import App from "./App"

import { store } from "./redux/store"

import "./firebase"

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <App />
      </LocalizationProvider>
    </Provider>
  </React.StrictMode>,
)
