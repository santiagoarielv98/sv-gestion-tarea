import { createSelector } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "../auth/authSlice";

interface Task {
  _id: string;
  title: string;
  isCompleted: boolean;
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
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl, credentials: "include" }),
  tagTypes: ["Tasks"],
  endpoints: (builder) => ({
    verifySession: builder.query<User, void>({
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
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
        } finally {
          dispatch(logout());
        }
      },
    }),
    getTasks: builder.query<Task[], void>({
      providesTags: ["Tasks"],
      query: () => "tasks",
    }),
    getTodayTasks: builder.query<Task[], void>({
      providesTags: ["Tasks"],
      query: () => "tasks/today",
    }),
    getCompletedTasks: builder.query<Task[], void>({
      providesTags: ["Tasks"],
      query: () => "tasks/completed",
    }),
    getTasksByDateRange: builder.query<Task[], { start: string; end: string }>({
      providesTags: ["Tasks"],
      query: ({ start, end }) => `tasks/range?start=${start}&end=${end}`,
    }),
    getTaskById: builder.query<Task, string>({
      providesTags: ["Tasks"],
      query: (_id) => `tasks/${_id}`,
    }),
    createTask: builder.mutation<Task, Partial<Task>>({
      query: (body) => ({
        url: "tasks",
        method: "POST",
        body,
      }),
    }),
    toggleTask: builder.mutation<Task, string>({
      invalidatesTags: ["Tasks"],
      query: (_id) => ({
        url: `tasks/${_id}`,
        method: "PATCH",
      }),
      async onQueryStarted(_id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData("getTasks", undefined, (draft) => {
            const task = draft.find((task) => task._id === _id);
            if (task) {
              task.isCompleted = !task.isCompleted;
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
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
  useLogoutMutation,
  useGetTasksQuery,
  useCreateTaskMutation,
  useToggleTaskMutation,
  useGetTodayTasksQuery,
  useGetCompletedTasksQuery,
  useGetTasksByDateRangeQuery,
  useGetTaskByIdQuery,
} = api;
