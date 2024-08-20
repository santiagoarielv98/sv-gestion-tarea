import { api } from '@/app/services/api';
import type { RegisterCredentials, LoginCredentials, User, CheckResponse } from './types/auth';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    check: builder.query<CheckResponse, void>({
      query: () => 'auth/check'
    }),
    login: builder.mutation<User, LoginCredentials>({
      query: (credentials) => ({
        url: 'auth/signin',
        method: 'POST',
        body: credentials
      })
    }),
    register: builder.mutation<User, RegisterCredentials>({
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
