import { createAsyncThunk } from "@reduxjs/toolkit"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  type QueryDocumentSnapshot,
  type SnapshotOptions,
  updateDoc,
  where,
} from "firebase/firestore"
import { auth, db } from "../../firebase"

export interface ILabel {
  id?: string
  title: string
  color: string
  userId: string
}

class Label {
  public userId: string
  constructor(
    public title: string,
    public color: string,
  ) {
    this.userId = auth.currentUser?.uid!
  }
}

const labelConverter = {
  toFirestore: (label: Label) => {
    return {
      title: label.title,
      color: label.color,
      userId: auth.currentUser?.uid!,
    }
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ) => {
    const data = snapshot.data(options) as Label
    return {
      id: snapshot.id,
      ...new Label(data.title, data.color),
    }
  },
}

export const getLabelById = createAsyncThunk(
  "labels/getLabelById",
  async (id: string, { rejectWithValue }) => {
    if (!auth.currentUser) {
      return rejectWithValue("User not logged in")
    }
    const docRef = doc(db, "labels", id).withConverter(labelConverter)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const data = docSnap.data()
      return {
        id: docSnap.id,
        ...data,
      }
    } else {
      return rejectWithValue("Label not found")
    }
  },
)

export type AddLabel = Omit<ILabel, "id">

export const addLabel = createAsyncThunk(
  "labels/addLabel",
  async (label: AddLabel, { rejectWithValue }) => {
    if (!auth.currentUser) {
      return rejectWithValue("User not logged in")
    }
    const docRef = await addDoc(
      collection(db, "labels").withConverter(labelConverter),
      label,
    )
    return { id: docRef.id, ...label }
  },
)

export type UpdateLabel = Partial<Omit<ILabel, "id">> & { id: string }

export const updateLabel = createAsyncThunk(
  "labels/updateLabel",
  async (label: UpdateLabel, { rejectWithValue }) => {
    if (!auth.currentUser) {
      return rejectWithValue("User not logged in")
    }
    const { id, ...labelWithoutId } = label
    const docRef = doc(db, "labels", id)

    await updateDoc(docRef.withConverter(labelConverter), {
      ...labelWithoutId,
    })
  },
)

export const deleteLabel = createAsyncThunk(
  "labels/deleteLabel",
  async (id: string, { rejectWithValue }) => {
    if (!auth.currentUser) {
      return rejectWithValue("User not logged in")
    }
    const docRef = doc(db, "labels", id)
    await deleteDoc(docRef)
    return id
  },
)

export type GetLabelsCallback = (labels: ILabel[]) => void

export function getLabels(callback: GetLabelsCallback) {
  const q = query(
    collection(db, "labels"),
    where("userId", "==", auth.currentUser!.uid),
  ).withConverter(labelConverter)

  return onSnapshot(q, {
    next: snapshot => {
      const labels = snapshot.docs.map(doc => doc.data())
      callback(labels)
    },
  })
}
