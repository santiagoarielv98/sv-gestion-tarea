import { createSelector } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const baseUrl = import.meta.env.VITE_API_URL;

interface User {
  email: string;
}

interface UserCredentials {
  email: string;
  password: string;
}

export const api = createApi({
  reducerPath: "api",
  tagTypes: ["User"],
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl, credentials: "include" }),
  endpoints: (builder) => ({
    verifySession: builder.query<User, void>({
      providesTags: ["User"],
      query: () => "users/check",
    }),
    login: builder.mutation<User, UserCredentials>({
      query: ({ email, password }) => ({
        providesTags: ["User"],
        url: "users/signin",
        method: "POST",
        body: { email, password },
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "users/signout",
        method: "POST",
      }),
    }),
    getTasks: builder.query<Task[], void>({
      query: () => "tasks",
    }),
    createTask: builder.mutation<Task, Partial<Task>>({
      query: (body) => ({
        url: "tasks",
        method: "POST",
        body,
      }),
    }),
    completeTask: builder.mutation<Task, Partial<Task>>({
      query: ({ id }) => ({
        url: `tasks/${id}`,
        method: "PATCH",
        body: { completed: true },
      }),
    }),
  }),
});

export const verifySessionResult = api.endpoints.verifySession.select();

export const selectVerifyState = createSelector(
  verifySessionResult,
  (result) => result
);

export const {
  useVerifySessionQuery,
  useLoginMutation,
  useGetTasksQuery,
  useCreateTaskMutation,
  useCompleteTaskMutation,
} = api;
