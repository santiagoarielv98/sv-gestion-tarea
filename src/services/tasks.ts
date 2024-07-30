import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore"
import { auth, db } from "../firebase"
import type { Moment } from "moment"
import type { Label } from "./label"

export interface CreateTask {
  id?: string
  title: string
  description?: string
  dueDate: Moment
  labels?: Label[]
  priority: "low" | "medium" | "high"
  isCompleted?: boolean
}

export const taskCollection = collection(db, "tasks")

export async function createTask(task: CreateTask) {
  const user = auth.currentUser

  if (!user) {
    throw new Error("User not found")
  }

  const dueDate = task.dueDate.toDate()
  const isCompleted = false
  const labels = task.labels?.filter(label => label.id).map(label => label.id)
  await addDoc(taskCollection, {
    ...task,
    isCompleted,
    dueDate,
    labels,
    createdBy: user.uid,
  })
}

export async function updateTask(taskId: string, task: Partial<CreateTask>) {
  const taskDoc = doc(db, "tasks", taskId)
  const dueDate = task.dueDate?.toDate()
  const labels = task.labels?.filter(label => label.id).map(label => label.id)
  await updateDoc(taskDoc, { ...task, labels, dueDate })
}

export async function getTasks() {
  const user = auth.currentUser

  if (!user) {
    throw new Error("User not found")
  }

  const taskSnapshot = await getDocs(taskCollection)
  const tasks = taskSnapshot.docs.map(doc => doc.data())
  return tasks
}

export async function deleteTask(taskId: string) {
  const user = auth.currentUser

  if (!user) {
    throw new Error("User not found")
  }

  await deleteDoc(doc(db, "tasks", taskId))
}

export async function toggleTaskCompletion(taskId: string) {
  const user = auth.currentUser

  if (!user) {
    throw new Error("User not found")
  }

  const taskDoc = doc(db, "tasks", taskId)
  const task = await getDoc(taskDoc)
  await updateDoc(taskDoc, { isCompleted: !task.data()!.isCompleted })
}
