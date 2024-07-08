import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ToDo - Corrert the type error or change everything to axios
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:3000/api/users`,
  }),
  tagTypes: ["auth"],
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (body) => ({
        url: `/signup`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["auth"],
    }),
    signin: builder.mutation({
      query: (body) => ({
        url: `/signin`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const { useSignupMutation, useSigninMutation } = authApi;
