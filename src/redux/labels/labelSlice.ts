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
  updateDoc,
  where,
  type FirestoreDataConverter,
} from "firebase/firestore"
import { auth, db } from "../../firebase"

export interface ILabel {
  id?: string
  title: string
  color: string
  userId: string
}

class Label {
  constructor(
    public id: string,
    public title: string,
    public color: string,
    public userId: string,
  ) {}
}

const labelConverter: FirestoreDataConverter<ILabel, Label> = {
  toFirestore: label => {
    const { id, ...labelWithoutId } = label
    return labelWithoutId as Label
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options) as Label
    return {
      ...new Label(snapshot.id, data.title, data.color, data.userId),
    }
  },
}

export const getLabelById = createAsyncThunk(
  "labels/getLabelById",
  async (id: string, { rejectWithValue }) => {
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

export const addLabel = createAsyncThunk(
  "labels/addLabel",
  async (label: ILabel) => {
    const docRef = (
      await addDoc(
        collection(db, "labels").withConverter(labelConverter),
        label,
      )
    ).withConverter(labelConverter)
    return { id: docRef.id }
  },
)

type UpdateLabel = Partial<Omit<ILabel, "id">> & { id: string }

export const updateLabel = createAsyncThunk(
  "labels/updateLabel",
  async (label: UpdateLabel) => {
    const { id, ...labelWithoutId } = label
    const docRef = doc(db, "labels", id)

    await updateDoc(docRef.withConverter(labelConverter), {
      ...labelWithoutId,
    })
  },
)

export const deleteLabel = createAsyncThunk(
  "labels/deleteLabel",
  async (id: string) => {
    const docRef = doc(db, "labels", id)
    await deleteDoc(docRef)
    return id
  },
)

// redux
export type LabelState = {
  labels: ILabel[]
  currentLabel: ILabel | null
  loading: boolean
}

const initialState: LabelState = {
  labels: [],
  currentLabel: null,
  loading: false,
}

export const labelSlice = createSlice({
  name: "labels",
  initialState,
  reducers: {
    setLabels: (state, action: PayloadAction<ILabel[]>) => {
      state.labels = action.payload
    },
    setCurrentLabel: (state, action: PayloadAction<ILabel | null>) => {
      state.currentLabel = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(addLabel.pending, state => {
        state.loading = true
      })
      .addCase(addLabel.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(updateLabel.pending, state => {
        state.loading = true
      })
      .addCase(updateLabel.fulfilled, (state, action) => {
        state.loading = false
        state.currentLabel = null
      })
      .addCase(deleteLabel.pending, state => {
        state.loading = true
      })
      .addCase(deleteLabel.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(getLabelById.pending, state => {
        state.loading = true
      })
      .addCase(getLabelById.fulfilled, (state, action) => {
        state.loading = false
        state.currentLabel = action.payload
      })
      .addCase(getLabelById.rejected, state => {
        state.loading = false
      })
  },
  selectors: {
    selectLabelState: state => state,
  },
})

export const { setLabels, setCurrentLabel } = labelSlice.actions

export const { selectLabelState } = labelSlice.selectors

type GetLabelsCallback = (labels: ILabel[]) => void

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
