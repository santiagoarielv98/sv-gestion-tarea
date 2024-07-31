import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  Timestamp,
  updateDoc,
  where,
  type FirestoreDataConverter,
} from "firebase/firestore"
import moment, { type Moment } from "moment"
import { auth, db } from "../../firebase"

export interface ITask {
  id?: string
  title: string
  description: string
  completed: boolean
  labels: string[]
  dueDate: string
  userId: string
}

interface TaskCreate {
  id?: string
  title: string
  description: string
  completed: boolean
  labels: string[]
  dueDate?: Moment
  userId: string
}

interface TaskDb extends Omit<TaskCreate, "dueDate"> {
  dueDate: Timestamp
}

class Task {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public completed: boolean,
    public labels: string[],
    public dueDate: Moment,
    public userId: string,
  ) {}
}

const taskConverter: FirestoreDataConverter<TaskCreate, TaskDb> = {
  toFirestore: task => {
    const { id, dueDate, ...taskWithoutId } = task
    const dueDateAsMoment = dueDate as Moment
    const convertedDueDate = Timestamp.fromDate(dueDateAsMoment.toDate())
    return {
      ...taskWithoutId,
      dueDate: convertedDueDate,
      completed: false,
    } as TaskDb
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options) as TaskDb
    return {
      ...new Task(
        snapshot.id,
        data.title,
        data.description,
        data.completed,
        data.labels,
        moment(data.dueDate.toDate()),
        data.userId,
      ),
    }
  },
}

export const getTaskById = createAsyncThunk(
  "tasks/getTaskById",
  async (id: string, { rejectWithValue }) => {
    const docRef = doc(db, "tasks", id).withConverter(taskConverter)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const data = docSnap.data()
      return {
        id: docSnap.id,
        ...data,
        dueDate: data.dueDate?.format()!,
      }
    } else {
      return rejectWithValue("Task not found")
    }
  },
)

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (task: TaskCreate) => {
    const docRef = (
      await addDoc(collection(db, "tasks").withConverter(taskConverter), task)
    ).withConverter(taskConverter)
    return { id: docRef.id, ...task, dueDate: task.dueDate?.format()! }
  },
)

type UpdateTask = Partial<Omit<TaskCreate, "id">> & { id: string }

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (task: UpdateTask) => {
    const { id, ...taskWithoutId } = task
    const docRef = doc(db, "tasks", id)

    await updateDoc(docRef.withConverter(taskConverter), {
      ...taskWithoutId,
      dueDate: Timestamp.fromDate(task.dueDate!.toDate()),
    })
  },
)

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id: string) => {
    const docRef = doc(db, "tasks", id)
    await deleteDoc(docRef)
    return id
  },
)

// redux
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
      const tasks = snapshot.docs.map(doc => doc.data())
      callback(
        tasks.map(task => ({ ...task, dueDate: task.dueDate?.format()! })),
      )
    },
  })
}
