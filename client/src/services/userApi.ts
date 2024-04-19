import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ 
        baseUrl: "/api/users", 
        credentials: "include",
    }),
    tagTypes: ["User"],
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => ({
                url: "/",
                method: "GET",
            }),
            providesTags: ["User"],
        }),
        signup: builder.mutation({
            query: (user) => ({
                url: "/signup",
                method: "POST",
                body: user,
            }),
            invalidatesTags: ["User"],
        }),
        signin: builder.mutation({
            query: (user) => ({
                url: "/signin",
                method: "POST",
                body: user,
            })
        }), 
    }),
});

export const { useGetUserQuery, useSignupMutation, useSigninMutation } = userApi;
