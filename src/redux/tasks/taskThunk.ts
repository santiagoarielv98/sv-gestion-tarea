import { createAsyncThunk } from "@reduxjs/toolkit"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  Timestamp,
  updateDoc,
  type FirestoreDataConverter,
} from "firebase/firestore"
import { auth, db } from "../../firebase"

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

export const taskConverter: FirestoreDataConverter<Task, FirestoreTask> = {
  toFirestore: task => {
    console.log("tofirestore", task)
    return {
      title: task.title,
      description: task.description,
      completed: task.completed,
      labels: task.labels,
      dueDate: task.dueDate
        ? Timestamp.fromDate(new Date(task.dueDate as string))
        : Timestamp.now(),
      userId: auth.currentUser?.uid!,
    } as FirestoreTask
  },
  fromFirestore: (snapshot, options) => {
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
    const docRef = doc(db, "tasks", id).withConverter(taskConverter)
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

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (task: Omit<Task, "userId">, { rejectWithValue }) => {
    if (!auth.currentUser) {
      return rejectWithValue("User not found")
    }
    await addDoc(collection(db, "tasks").withConverter(taskConverter), task)
  },
)

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (
    task: Omit<Partial<Task>, "userId"> & { id: string },
    { rejectWithValue },
  ) => {
    if (!auth.currentUser) {
      return rejectWithValue("User not found")
    }
    const { id, ...taskWithoutId } = task
    const docRef = doc(db, "tasks", id).withConverter(taskConverter)

    await updateDoc(docRef, taskWithoutId)
  },
)

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id: string) => {
    const docRef = doc(db, "tasks", id)
    await deleteDoc(docRef)
  },
)
