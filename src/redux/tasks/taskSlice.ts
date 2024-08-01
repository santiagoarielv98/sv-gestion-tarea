import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import {
  addTask,
  deleteTask,
  getTaskById,
  type ITask,
  updateTask,
} from "./taskThunk"

export type TaskState = {
  tasks: ITask[]
  currentTask: ITask | null
  loading: boolean
}

const initialState: TaskState = {
  tasks: [],
  currentTask: null,
  loading: false,
}

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<ITask[]>) => {
      state.tasks = action.payload
    },
    setCurrentTask: (state, action: PayloadAction<ITask | null>) => {
      state.currentTask = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(addTask.pending, state => {
        state.loading = true
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(updateTask.pending, state => {
        state.loading = true
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false
        state.currentTask = null
      })
      .addCase(deleteTask.pending, state => {
        state.loading = true
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(getTaskById.pending, state => {
        state.loading = true
      })
      .addCase(getTaskById.fulfilled, (state, action) => {
        state.loading = false
        state.currentTask = action.payload
      })
      .addCase(getTaskById.rejected, state => {
        state.loading = false
      })
  },
  selectors: {
    selectTaskState: state => state,
  },
})

export const { setTasks, setCurrentTask } = taskSlice.actions

export const { selectTaskState } = taskSlice.selectors
