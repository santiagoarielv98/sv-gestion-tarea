import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type ModalType = "task" | null;

interface ModalState {
  modalOpen: ModalType;
  modalConfirm: boolean;
}

const initialState: ModalState = {
  modalOpen: null,
  modalConfirm: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState: initialState,
  reducers: {
    setModalOpen: (state, action: PayloadAction<ModalType>) => {
      state.modalOpen = action.payload;
    },
    setModalConfirm: (state, action: PayloadAction<boolean>) => {
      state.modalConfirm = action.payload;
    },
  },
  selectors: {
    selectModalState: (state) => state,
  },
});

export const { setModalOpen, setModalConfirm } = modalSlice.actions;

export const { selectModalState } = modalSlice.selectors;
