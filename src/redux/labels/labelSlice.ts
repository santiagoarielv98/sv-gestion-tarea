import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import {
  addLabel,
  deleteLabel,
  getLabelById,
  type Label,
  updateLabel,
} from "./labelThunk"

// redux
export type LabelState = {
  labels: Label[]
  currentLabel: Label | null
  loading: boolean
}

const initialState: LabelState = {
  labels: [],
  currentLabel: null,
  loading: false,
}

export const labelSlice = createSlice({
  name: "labels",
  initialState,
  reducers: {
    setLabels: (state, action: PayloadAction<Label[]>) => {
      state.labels = action.payload
    },
    setCurrentLabel: (state, action: PayloadAction<Label | null>) => {
      state.currentLabel = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(addLabel.pending, state => {
        state.loading = true
      })
      .addCase(addLabel.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(updateLabel.pending, state => {
        state.loading = true
      })
      .addCase(updateLabel.fulfilled, (state, action) => {
        state.loading = false
        state.currentLabel = null
      })
      .addCase(deleteLabel.pending, state => {
        state.loading = true
      })
      .addCase(deleteLabel.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(getLabelById.pending, state => {
        state.loading = true
      })
      .addCase(getLabelById.fulfilled, (state, action) => {
        state.loading = false
        state.currentLabel = action.payload
      })
      .addCase(getLabelById.rejected, state => {
        state.loading = false
      })
  },
  selectors: {
    selectLabelState: state => state,
  },
})

export const { setLabels, setCurrentLabel } = labelSlice.actions

export const { selectLabelState } = labelSlice.selectors
