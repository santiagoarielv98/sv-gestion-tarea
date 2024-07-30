import { addDoc, collection, getDocs } from "firebase/firestore"
import { db } from "../firebase"

export interface Label {
  id?: string
  name: string
  color: string
  inputValue?: string
}

export const labelCollection = collection(db, "labels")

export const createLabel = async (label: Label) => {
  return await addDoc(labelCollection, label)
}

export const getLabels = async () => {
  const querySnapshot = await getDocs(labelCollection)
  const labels: Label[] = []
  querySnapshot.forEach(doc => {
    labels.push({ id: doc.id, ...doc.data() } as Label)
  })
  return labels
}
