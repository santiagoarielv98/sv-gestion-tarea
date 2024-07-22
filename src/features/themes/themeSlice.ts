import { createSlice } from "@reduxjs/toolkit"

export enum ColorMode {
  Light = "light",
  Dark = "dark",
}

export interface ThemeState {
  colorMode: ColorMode
}

const initialState: ThemeState = {
  colorMode: (() => {
    if (typeof window !== "undefined") {
      const persistedColorMode = localStorage.getItem("colorMode")
      if (persistedColorMode) {
        return persistedColorMode === ColorMode.Dark
          ? ColorMode.Dark
          : ColorMode.Light
      }
    }
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches
    return prefersDarkMode ? ColorMode.Dark : ColorMode.Light
  })(),
}

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: create => ({
    toggleColorMode: create.reducer(state => {
      let newColorMode: ColorMode =
        state.colorMode === ColorMode.Light ? ColorMode.Dark : ColorMode.Light
      if (typeof window !== "undefined") {
        localStorage.setItem("colorMode", newColorMode)
      }
      state.colorMode = newColorMode
    }),
  }),
  selectors: {
    selectColorMode: state => state.colorMode,
  },
})

export const { toggleColorMode } = themeSlice.actions

export const { selectColorMode } = themeSlice.selectors
