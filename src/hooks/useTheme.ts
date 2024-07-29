import React from "react"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import {
  selectColorMode,
  selectDrawerOpen,
  setDrawerOpen,
  toggleColorMode,
  toggleDrawer,
} from "../redux/settings/settingSlice"

export default function useSettings() {
  const dispatch = useAppDispatch()
  const open = useAppSelector(selectDrawerOpen)
  const colorMode = useAppSelector(selectColorMode)

  const toggleDrawerOpen = React.useCallback(() => {
    dispatch(toggleDrawer())
  }, [dispatch])
  const toggleColor = React.useCallback(() => {
    dispatch(toggleColorMode())
  }, [dispatch])

  const setDrawer = React.useCallback(
    (open: boolean) => {
      dispatch(setDrawerOpen(open))
    },
    [dispatch],
  )

  return {
    colorMode,
    open,
    toggleDrawerOpen,
    toggleColor,
    setDrawer,
  }
}
