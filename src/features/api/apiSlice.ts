import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const baseUrl = import.meta.env.VITE_API_URL;

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
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

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useCompleteTaskMutation,
} = apiSlice;
