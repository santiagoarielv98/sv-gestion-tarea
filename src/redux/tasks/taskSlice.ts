import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { auth, db } from "../../firebase"
import {
  addTask,
  deleteTask,
  getTaskById,
  type ITask,
  taskConverter,
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

type GetTasksCallback = (tasks: ITask[]) => void

export function getTasks(callback: GetTasksCallback) {
  const q = query(
    collection(db, "tasks"),
    where("userId", "==", auth.currentUser!.uid),
  ).withConverter(taskConverter)

  return onSnapshot(q, {
    next: snapshot => {
      const tasks: ITask[] = []
      snapshot.forEach(doc => {
        tasks.push({ ...doc.data(), id: doc.id })
      })
      callback(tasks)
    },
  })
}
