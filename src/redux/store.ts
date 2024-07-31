import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore, createSlice } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"

const initialSlice = createSlice({
  name: "initial",
  initialState: {
    loading: false,
  },
  reducers: {},
})

const rootReducer = combineSlices(initialSlice)

export type RootState = ReturnType<typeof rootReducer>

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  })
  setupListeners(store.dispatch)
  return store
}

export const store = makeStore()

export type AppStore = typeof store

export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
