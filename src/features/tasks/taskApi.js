import { api } from '@/app/services/api';

const taskApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTask: builder.query({
      query: (id) => `tasks/${id}`
    }),
    getTasks: builder.query({
      query: () => 'tasks',
      providesTags: ['Task']
    }),
    createTask: builder.mutation({
      query: (task) => ({
        url: 'tasks',
        method: 'POST',
        body: task
      }),
      invalidatesTags: ['Task']
    }),
    updateTask: builder.mutation({
      query: ({ _id, ...task }) => ({
        url: `tasks/${_id}`,
        method: 'PUT',
        body: task
      }),
      invalidatesTags: ['Task']
    })
  })
});

taskApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteTask: builder.mutation({
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

//toggle
taskApi.injectEndpoints({
  endpoints: (builder) => ({
    toggleTask: builder.mutation({
      query: (id) => ({
        url: `tasks/toggle/${id}/`,
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

export const {
  useGetTaskQuery,
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useToggleTaskMutation
} = taskApi;
