import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore"
import { db } from "../firebase"
import type { Moment } from "moment"

export interface CreateTask {
  id?: string
  title: string
  description?: string
  dueDate: Moment
  labels?: string[]
  priority: "low" | "medium" | "high"
}

export const taskCollection = collection(db, "tasks")

export async function createTask(task: CreateTask) {
  const dueDate = task.dueDate.toDate()
  await addDoc(taskCollection, { ...task, dueDate })
}

export async function updateTask(taskId: string, task: Partial<CreateTask>) {
  const taskDoc = doc(db, "tasks", taskId)
  const dueDate = task.dueDate?.toDate()
  await updateDoc(taskDoc, { ...task, dueDate })
}

export async function getTasks() {
  const taskSnapshot = await getDocs(taskCollection)
  const tasks = taskSnapshot.docs.map(doc => doc.data())
  return tasks
}

export async function deleteTask(taskId: string) {
  await deleteDoc(doc(db, "tasks", taskId))
}
