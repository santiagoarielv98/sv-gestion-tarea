import type { Action, PayloadAction, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { authSlice } from "./auth/authSlice"
import { labelSlice } from "./labels/labelSlice"
import { modalSlice } from "./modal/modalSlice"
import { taskSlice } from "./tasks/taskSlice"

const combinedSliceReducer = combineSlices(
  authSlice,
  taskSlice,
  labelSlice,
  modalSlice,
)

const rootReducer = (state: any, action: PayloadAction) => {
  if (action.type === "auth/signOut/fulfilled") {
    state = undefined
  }
  return combinedSliceReducer(state, action)
}

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
