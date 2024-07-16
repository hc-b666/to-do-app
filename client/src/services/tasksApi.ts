import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getToken = () => localStorage.getItem("token");

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:3000/api/tasks`,
    prepareHeaders: (headers) => {
      const token = getToken();

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["task", "status"],
  endpoints: (builder) => ({
    getStatuses: builder.query({
      query: () => ({
        url: `/getStatuses`,
        method: "GET",
      }),
      providesTags: ["status"],
    }),
    getTasks: builder.query({
      query: () => ({
        url: "/getTasks",
        method: "GET",
      }),
      providesTags: ["task"],
    }),
    getUpcomingTasks: builder.query({
      query: () => ({
        url: "/getUpcomingTasks",
        method: "GET",
      }),
      providesTags: ["task"],
    }),
    getTodayTasksLength: builder.query({
      query: () => ({
        url: "/getTodayTasksLength",
        method: "GET",
      }),
      providesTags: ["task"],
    }),
    postTask: builder.mutation({
      query: (body) => ({
        url: "/postTask",
        method: "POST",
        body,
      }),
      invalidatesTags: ["task"],
    }),
    updateTaskStatus: builder.mutation({
      query: ({ id, status }: { id: number; status: string }) => {
        return {
          url: `/updateTaskStatus/${id}`,
          method: "PUT",
          body: { status },
        };
      },
      invalidatesTags: ["task"],
    }),
    deleteTask: builder.mutation({
      query: (taskId) => ({
        url: `/deleteTask/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["task"],
    }),
  }),
});

export const {
  useGetStatusesQuery,
  useGetTasksQuery,
  useGetUpcomingTasksQuery,
  useGetTodayTasksLengthQuery,
  usePostTaskMutation,
  useUpdateTaskStatusMutation,
  useDeleteTaskMutation,
} = tasksApi;
