import { api } from '@/app/services/api';

import type { Task, TaskCreate, TaskUpdate } from './types/task';

const taskApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTask: builder.query<Task, void>({
      query: (id) => `tasks/${id}`
    }),
    getTasks: builder.query<Task[], void>({
      query: () => 'tasks',
      providesTags: ['Task']
    }),
    createTask: builder.mutation<Task, TaskCreate>({
      query: (task) => ({
        url: 'tasks',
        method: 'POST',
        body: task
      }),
      invalidatesTags: ['Task']
    }),
    updateTask: builder.mutation<Task, TaskUpdate>({
      query: ({ _id, ...task }) => ({
        url: `tasks/${_id}`,
        method: 'PUT',
        body: task
      }),
      invalidatesTags: ['Task']
    })
  })
});

export const { useDeleteTaskMutation } = taskApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteTask: builder.mutation<void, string>({
      query: (id) => ({
        url: `tasks/${id}`,
        method: 'DELETE'
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          taskApi.util.updateQueryData('getTasks', undefined, (drafts) => {
            const index = drafts.findIndex((task) => task._id === id);
            if (index !== -1) {
              drafts.splice(index, 1);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      }
    })
  })
});

export const { useToggleTaskMutation } = taskApi.injectEndpoints({
  endpoints: (builder) => ({
    toggleTask: builder.mutation<void, string>({
      query: (id) => ({
        url: `tasks/${id}/toggle`,
        method: 'PATCH'
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          taskApi.util.updateQueryData('getTasks', undefined, (drafts) => {
            const task = drafts.find((task) => task._id === id);
            if (task) {
              task.completed = !task.completed;
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      }
    })
  })
});

export const { useGetTaskQuery, useGetTasksQuery, useCreateTaskMutation, useUpdateTaskMutation } = taskApi;
