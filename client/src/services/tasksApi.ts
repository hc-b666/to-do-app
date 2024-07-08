import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getToken = () => localStorage.getItem("token");

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
  tagTypes: ["task"],
  endpoints: (builder) => ({
    getStatuses: builder.query({
      query: () => ({
        url: `/getStatuses`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetStatusesQuery } = tasksApi;
