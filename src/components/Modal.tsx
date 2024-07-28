import React from "react"

import Dialog from "@mui/material/Dialog"

import { useAppDispatch, useAppSelector } from "../redux/hooks"

import {
  type ModalType,
  selectOpen,
  selectType,
  closeModal,
} from "../redux/modal/modalSlice"

const M = () => {
  return <></>
}

const Modals: Record<
  ModalType,
  | React.LazyExoticComponent<React.FC<Record<string, unknown>>>
  | React.FC<Record<string, unknown>>
> = {
  none: M,
  addTask: React.lazy(() => import("./AddForm")),
}

export default function Modal() {
  const dispatch = useAppDispatch()
  const open = useAppSelector(selectOpen)
  const type = useAppSelector(selectType)

  const Element = Modals[type]
  return (
    <Dialog open={open} onClose={() => dispatch(closeModal())}>
      <React.Suspense fallback={null}>{<Element />}</React.Suspense>
    </Dialog>
  )
}
