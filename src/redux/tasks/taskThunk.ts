import { createAsyncThunk } from "@reduxjs/toolkit"
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
  type QueryDocumentSnapshot,
  type SnapshotOptions,
} from "firebase/firestore"
import { auth, db } from "../../firebase"
import { TASK_COLLECTION } from "../../firebase/constants"

export interface ITask {
  id: string
  title: string
  description: string
  completed: boolean
  labels: string[]
  dueDate: string
  userId: string
}

export interface FirestoreTask {
  title: string
  description: string
  completed: boolean
  labels: string[]
  dueDate: Timestamp
  userId: string
}

export class Task {
  public userId: string
  constructor(
    public title: string,
    public description: string,
    public completed: boolean,
    public labels: string[] = [],
    public dueDate: string,
  ) {
    this.userId = auth.currentUser?.uid!
  }
}

export const taskConverter = {
  toFirestore: (task: Task) => {
    return {
      title: task.title,
      description: task.description || "",
      completed: task.completed,
      labels: task.labels || [],
      dueDate: task.dueDate
        ? Timestamp.fromDate(new Date(task.dueDate as string))
        : Timestamp.now(),
      userId: auth.currentUser?.uid!,
    }
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ) => {
    const data = snapshot.data(options) as FirestoreTask
    return {
      id: snapshot.id,
      ...new Task(
        data.title,
        data.description || "",
        data.completed,
        data.labels,
        data.dueDate.toDate().toISOString(),
      ),
    }
  },
}

export const getTaskById = createAsyncThunk(
  "tasks/getTaskById",
  async (id: string, { rejectWithValue }) => {
    if (!auth.currentUser) {
      return rejectWithValue("User not found")
    }
    const docRef = doc(db, TASK_COLLECTION, id).withConverter(taskConverter)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const data = docSnap.data()
      return {
        id: docSnap.id,
        ...data,
      }
    } else {
      return rejectWithValue("Task not found")
    }
  },
)

export type AddTask = Omit<Task, "userId">

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (task: AddTask, { rejectWithValue }) => {
    if (!auth.currentUser) {
      return rejectWithValue("User not found")
    }
    await addDoc(
      collection(db, TASK_COLLECTION).withConverter(taskConverter),
      task,
    )
  },
)

export type UpdateTask = Omit<Partial<Task>, "userId"> & { id: string }

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (task: UpdateTask, { rejectWithValue }) => {
    if (!auth.currentUser) {
      return rejectWithValue("User not found")
    }
    const { id, ...taskWithoutId } = task

    const docRef = doc(db, TASK_COLLECTION, id)

    const updatedTask = taskConverter.toFirestore(taskWithoutId as Task)

    await updateDoc(docRef, updatedTask)
  },
)

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id: string, { rejectWithValue }) => {
    if (!auth.currentUser) {
      return rejectWithValue("User not found")
    }
    const docRef = doc(db, TASK_COLLECTION, id)
    await deleteDoc(docRef)
  },
)

export type GetTasksCallback = (tasks: ITask[]) => void

export function getTasks(callback: GetTasksCallback) {
  const q = query(
    collection(db, TASK_COLLECTION),
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
