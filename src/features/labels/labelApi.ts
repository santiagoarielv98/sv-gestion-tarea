import { api } from '@/app/services/api';
import type { Tag, TagUpdate, TagCreate } from './types/tag';

const labelApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getLabel: builder.query<Tag, string>({
      query: (id) => `tags/${id}`
    }),
    getLabels: builder.query<Tag[], void>({
      query: () => 'tags',
      providesTags: ['Label']
    }),
    createLabel: builder.mutation<Tag, TagCreate>({
      query: (label) => ({
        url: 'tags',
        method: 'POST',
        body: label
      }),
      invalidatesTags: ['Label']
    }),
    updateLabel: builder.mutation<Tag, TagUpdate>({
      query: ({ _id, ...label }) => ({
        url: `tags/${_id}`,
        method: 'PUT',
        body: label
      }),
      invalidatesTags: ['Label', 'Task']
    }),
    deleteLabel: builder.mutation<void, string>({
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
