import { api } from '@/app/services/api';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    check: builder.query<void, void>({
      query: () => 'auth/check'
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: 'auth/signin',
        method: 'POST',
        body: credentials
      })
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: 'auth/signup',
        method: 'POST',
        body: credentials
      })
    }),
    logout: builder.mutation({
      query: () => ({
        url: 'auth/signout',
        method: 'POST'
      })
    })
  })
});

export const { useCheckQuery, useLoginMutation, useRegisterMutation, useLogoutMutation } = authApi;
