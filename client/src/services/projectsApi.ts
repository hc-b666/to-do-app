import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getToken = () => localStorage.getItem("token");

export const projectsApi = createApi({
  reducerPath: "projectsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:3000/api/projects`,
    prepareHeaders: (headers) => {
      const token = getToken();

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["project", "status", "projectTask"],
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: (projectId: number) => ({
        url: `/getTasks/${projectId}`,
        method: "GET",
      }),
      providesTags: ["projectTask"],
    }),
    postProjectTask: builder.mutation({
      query: ({ data, projectId }) => ({
        url: `/postTask/${projectId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["projectTask"],
    }),
    editProjectTask: builder.mutation({
      query: ({ data, taskId }) => ({
        url: `/editTask/${taskId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["projectTask"],
    }),
    deleteProjectTask: builder.mutation({
      query: ({ taskId }) => ({
        url: `/deleteTask/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["projectTask"],
    }),
    getProjects: builder.query({
      query: () => ({
        url: "/getProjects",
        method: "GET",
      }),
      providesTags: ["project"],
    }),
    getProject: builder.query({
      query: (projectId: number) => ({
        url: `/getProject/${projectId}`,
        method: "GET",
      }),
      providesTags: ["project"],
    }),
    postProject: builder.mutation({
      query: (data) => ({
        url: "/postProject",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["project"],
    }),
    editProject: builder.mutation({
      query: ({ data, projectId }) => ({
        url: `/editProject/${projectId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["project"],
    }),
    deleteProject: builder.mutation({
      query: ({ projectId }) => ({
        url: `/deleteProject/${projectId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["project"],
    }),
    searchUsersId: builder.query({
      query: (search) => ({
        url: `/searchUserId/${search}`,
        method: "GET",
      }),
      providesTags: ["project"],
    }),
    addUserToProject: builder.mutation({
      query: ({ userId, projectId }) => ({
        url: `/addUserToProject/${projectId}`,
        method: "POST",
        body: { userId },
      }),
      invalidatesTags: ["project"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  usePostProjectTaskMutation,
  useEditProjectTaskMutation,
  useDeleteProjectTaskMutation,
  useGetProjectsQuery,
  useGetProjectQuery,
  usePostProjectMutation,
  useEditProjectMutation,
  useDeleteProjectMutation,
  useSearchUsersIdQuery,
  useAddUserToProjectMutation,
} = projectsApi;
