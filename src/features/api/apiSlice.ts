import { createSelector } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "../auth/authSlice";

export interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: Date;
  labels: Label[];
  priority: Priority;
  isCompleted: boolean;
  __v: number;
}

export interface Label {
  _id: string;
  name: string;
  color: string;
  __v: number;
}

export enum Priority {
  High = "high",
  Low = "low",
  Medium = "medium",
  Urgent = "urgent",
}

const baseUrl = import.meta.env.VITE_API_URL;

interface User {
  email: string;
}

interface UserCredentials {
  email: string;
  password: string;
}

export type TaskTag = "Tasks" | "TodayTasks" | "CompletedTasks";

const dict = {
  Tasks: "getTasks",
  TodayTasks: "getTodayTasks",
  CompletedTasks: "getCompletedTasks",
} as const;

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl, credentials: "include" }),
  tagTypes: ["Tasks", "TodayTasks", "CompletedTasks"],
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
      providesTags: ["TodayTasks"],
      query: () => "tasks/today",
    }),
    getCompletedTasks: builder.query<Task[], void>({
      providesTags: ["CompletedTasks"],
      query: () => "tasks/completed",
    }),
    getTasksByDateRange: builder.query<Task[], { start: string; end: string }>({
      // providesTags: ["Tasks"],
      query: ({ start, end }) => `tasks/range?start=${start}&end=${end}`,
    }),
    getTaskById: builder.query<Task, string>({
      // providesTags: ["Tasks"],
      query: (_id) => `tasks/${_id}`,
    }),
    createTask: builder.mutation<Task, Partial<Task>>({
      query: (body) => ({
        url: "tasks",
        method: "POST",
        body,
      }),
    }),
    toggleTask: builder.mutation<Task, { _id: string; tag: TaskTag }>({
      query: ({ _id }) => ({
        url: `tasks/${_id}`,
        method: "PATCH",
      }),
      invalidatesTags(_result, _error, { tag }) {
        return [{ type: tag }];
      },
      async onQueryStarted({ _id, tag }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData(dict[tag], undefined, (draft) => {
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
