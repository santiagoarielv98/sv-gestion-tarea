import { addDoc, collection, getDocs, query, where } from "firebase/firestore"
import { auth, db } from "../firebase"

export interface Label {
  id?: string
  name: string
  color: string
  inputValue?: string
}

export const labelCollection = collection(db, "labels")

export const createLabel = async (label: Label) => {
  if (!auth.currentUser) {
    throw new Error("User not authenticated")
  }

  return await addDoc(labelCollection, {
    ...label,
    userId: auth.currentUser.uid,
  })
}

export const getLabels = async () => {
  if (!auth.currentUser) {
    return []
  }

  // userId === auth.currentUser.uid
  const q = query(labelCollection, where("userId", "==", auth.currentUser.uid))
  const querySnapshot = await getDocs(q)

  const labels: Label[] = []
  querySnapshot.forEach(doc => {
    labels.push({ id: doc.id, ...doc.data() } as Label)
  })
  return labels
}
