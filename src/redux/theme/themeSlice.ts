import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export enum ColorMode {
  Light = "light",
  Dark = "dark",
}

export interface ThemeState {
  colorMode: ColorMode
  drawerOpen?: boolean
}

const COLOR_MODE_KEY = "colorMode"

const initialState: ThemeState = {
  colorMode: getInitialColorMode(),
  drawerOpen: false,
}

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: create => ({
    toggleColorMode: create.reducer(state => {
      let newColorMode: ColorMode =
        state.colorMode === ColorMode.Light ? ColorMode.Dark : ColorMode.Light
      localStorage.setItem(COLOR_MODE_KEY, newColorMode)
      state.colorMode = newColorMode
    }),
    toggleDrawer: create.reducer(state => {
      state.drawerOpen = !state.drawerOpen
    }),
    setDrawerOpen: create.reducer((state, action: PayloadAction<boolean>) => {
      state.drawerOpen = action.payload
    }),
  }),
  selectors: {
    selectColorMode: state => state.colorMode,
    selectDrawerOpen: state => state.drawerOpen,
  },
})

export const { toggleColorMode, toggleDrawer, setDrawerOpen } =
  themeSlice.actions

export const { selectColorMode, selectDrawerOpen } = themeSlice.selectors

function getInitialColorMode() {
  const persistedColorMode = localStorage.getItem(COLOR_MODE_KEY)
  if (persistedColorMode) {
    return persistedColorMode === ColorMode.Dark
      ? ColorMode.Dark
      : ColorMode.Light
  }
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches
  return prefersDarkMode ? ColorMode.Dark : ColorMode.Light
}
