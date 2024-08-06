import {
  combineReducers,
  configureStore,
  type UnknownAction,
} from "@reduxjs/toolkit";
import { api } from "../features/api/apiSlice";
import authReducer from "../features/auth/authSlice";

const appReducer = combineReducers({
  auth: authReducer,
  [api.reducerPath]: api.reducer,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

// Infer the `RootState`,  `AppDispatch`, and `AppStore` typ    es from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
