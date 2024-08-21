import authReducer from '@/features/auth/authSlice';
import layoutReducer from '@/features/layout/layoutSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from './services/api';

const rootReducer = combineReducers({
  auth: authReducer,
  layout: layoutReducer,
  [api.reducerPath]: api.reducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
