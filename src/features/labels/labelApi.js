import { api } from '@/app/services/api';

const labelApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getLabel: builder.query({
      query: (id) => `labels/${id}`
    }),
    getLabels: builder.query({
      query: () => 'labels',
      providesTags: ['Label']
    }),
    createLabel: builder.mutation({
      query: (label) => ({
        url: 'labels',
        method: 'POST',
        body: {
          title: label
        }
      }),
      invalidatesTags: ['Label']
    }),
    updateLabel: builder.mutation({
      query: ({ id, label }) => ({
        url: `labels/${id}`,
        method: 'PUT',
        body: label
      })
    }),
    deleteLabel: builder.mutation({
      query: (id) => ({
        url: `labels/${id}`,
        method: 'DELETE'
      })
    })
  })
});

export const { useGetLabelQuery, useGetLabelsQuery, useCreateLabelMutation, useUpdateLabelMutation, useDeleteLabelMutation } = labelApi;
