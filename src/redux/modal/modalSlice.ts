import { createSlice } from "@reduxjs/toolkit"

export type ModalType = "addTask" | "none"

interface ModalState {
  open: boolean
  type: ModalType
}

const initialState: ModalState = {
  open: false,
  type: "none",
}

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.open = true
      state.type = action.payload
    },
    closeModal: state => {
      state.open = false
      state.type = "none"
    },
  },
  selectors: {
    selectOpen: (state: ModalState) => state.open,
    selectType: (state: ModalState) => state.type,
  },
})

export const { openModal, closeModal } = modalSlice.actions

export const { selectOpen, selectType } = modalSlice.selectors
