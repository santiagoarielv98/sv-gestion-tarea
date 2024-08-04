import { createAsyncThunk } from "@reduxjs/toolkit"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  updateDoc,
  where,
  type QueryDocumentSnapshot,
  type SnapshotOptions,
} from "firebase/firestore"
import { auth, db } from "../../firebase"
import { TASK_COLLECTION } from "../../firebase/constants"

export interface FirestoreTask {
  title: string
  description: string
  completed: boolean
  labels: string[]
  dueDate: Timestamp
  userId: string
  priority: number
}

export class Task {
  public userId: string
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public completed: boolean,
    public labels: string[] = [],
    public dueDate: string,
    public priority: number = 2,
  ) {
    this.userId = auth.currentUser?.uid!
  }
}

export const taskConverter = {
  toFirestore: (task: Task) => {
    return {
      title: task.title,
      description: task.description || "",
      completed: task.completed || false,
      labels: task.labels || [],
      dueDate: task.dueDate
        ? Timestamp.fromDate(new Date(task.dueDate))
        : Timestamp.now(),
      userId: auth.currentUser?.uid!,
      priority: task.priority || 2,
    }
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ) => {
    const data = snapshot.data(options) as FirestoreTask
    return {
      ...new Task(
        snapshot.id,
        data.title,
        data.description || "",
        data.completed,
        data.labels,
        data.dueDate.toDate().toISOString(),
        data.priority,
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
      return docSnap.data()
    } else {
      return rejectWithValue("Task not found")
    }
  },
)

export type AddTask = Omit<Task, "userId" | "id">

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

export type GetTasksCallback = (tasks: Task[]) => void

export function getTasks(callback: GetTasksCallback) {
  const q = query(
    collection(db, TASK_COLLECTION),
    orderBy("dueDate", "asc"),
    where("userId", "==", auth.currentUser!.uid),
  ).withConverter(taskConverter)

  return onSnapshot(q, {
    next: snapshot => {
      const tasks: Task[] = []
      snapshot.forEach(doc => {
        tasks.push(doc.data())
      })
      callback(tasks)
    },
  })
}
