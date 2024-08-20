import { api } from '@/app/services/api';

const labelApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getLabel: builder.query({
      query: (id) => `tags/${id}`
    }),
    getLabels: builder.query({
      query: () => 'tags',
      providesTags: ['Label']
    }),
    createLabel: builder.mutation({
      query: (label) => ({
        url: 'tags',
        method: 'POST',
        body: label
      }),
      invalidatesTags: ['Label']
    }),
    updateLabel: builder.mutation({
      query: ({ _id, ...label }) => ({
        url: `tags/${_id}`,
        method: 'PUT',
        body: label
      }),
      invalidatesTags: ['Label', 'Task']
    }),
    deleteLabel: builder.mutation({
      query: (_id) => ({
        url: `tags/${_id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Label', 'Task']
    })
  })
});

export const {
  useGetLabelQuery,
  useGetLabelsQuery,
  useCreateLabelMutation,
  useUpdateLabelMutation,
  useDeleteLabelMutation
} = labelApi;
