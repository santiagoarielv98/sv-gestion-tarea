import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_URL;

export const api = createApi({
  tagTypes: ['Task', 'Label'],
  baseQuery: fetchBaseQuery({
    credentials: 'include',
    baseUrl
  }),
  endpoints: () => ({})
});
