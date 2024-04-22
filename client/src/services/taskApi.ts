import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const taskApi = createApi({
    reducerPath: "taskApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/tasks",
        credentials: "include",
    }),
    tagTypes: ["Task"],
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: (id) => ({
                url: `/${id}`,
                method: "GET",
            }),
            providesTags: ["Task"],
        }),
        createTask: builder.mutation({
            query: (task) => ({
                url: "/",
                method: "POST",
                body: task,
            }),
            invalidatesTags: ["Task"],
        }),
    }),
});

export const { useGetTasksQuery, useCreateTaskMutation } = taskApi;
