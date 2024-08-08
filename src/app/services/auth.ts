import { createSelector } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "../../features/auth/authSlice";

export interface User {
  email: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}

const baseUrl = import.meta.env.VITE_API_URL;

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl, credentials: "include" }),
  endpoints: (builder) => ({
    verifySession: builder.query<User, void>({
      query: () => "users/check",
    }),
    login: builder.mutation<User, UserCredentials>({
      query: ({ email, password }) => ({
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
  }),
});

export const verifySessionResult = api.endpoints.verifySession.select();

export const selectVerifyState = createSelector(
  verifySessionResult,
  (result) => result
);

export const { useVerifySessionQuery, useLoginMutation, useLogoutMutation } =
  api;
