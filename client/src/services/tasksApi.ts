import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getToken = () => localStorage.getItem("token");

export interface StatusesData {
  status: number;
  statusSegments: string[];
}

export interface TasksData {
  status: number;
  tasks: Task[];
}

export interface TodayTasksLengthData {
  status: number;
  length: number;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  deadline: string;
  status: string;
}

// ToDo - Corrert the type error or change everything to axios
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
    getStatuses: builder.query<StatusesData, void>({
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
    getTodayTasksLength: builder.query<TodayTasksLengthData, void>({
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
  }),
});

export const {
  useGetStatusesQuery,
  useGetTasksQuery,
  useGetTodayTasksLengthQuery,
  usePostTaskMutation,
  useUpdateTaskStatusMutation,
} = tasksApi;
