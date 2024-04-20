import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/users",
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
            }),
        }),
        signout: builder.mutation({
            query: () => ({
                url: "/signout",
                method: "POST",
            }),
        }),
    }),
});

export const {
    useGetUserQuery,
    useSignupMutation,
    useSigninMutation,
    useSignoutMutation,
} = userApi;
