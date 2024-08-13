/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  combineReducers,
  configureStore,
  type UnknownAction,
} from "@reduxjs/toolkit";
import { api } from "./services/auth";
import authReducer from "@/features/auth/authSlice";
import { modalSlice } from "@/features/modal/modalSlice";

const appReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authReducer,
  modal: modalSlice.reducer,
});

const rootReducer = (state: any, action: UnknownAction) => {
  if (action.type === "auth/logout/fulfilled") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
