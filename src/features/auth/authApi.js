import { api } from '@/app/services/api';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    check: builder.query({
      query: () => 'users/check'
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: 'users/signin',
        method: 'POST',
        body: credentials
      })
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: 'users/signup',
        method: 'POST',
        body: credentials
      })
    }),
    logout: builder.mutation({
      query: () => ({
        url: 'users/signout',
        method: 'POST'
      })
    })
  })
});

export const { useCheckQuery, useLoginMutation, useRegisterMutation, useLogoutMutation } = authApi;
