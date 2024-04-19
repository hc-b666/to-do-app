import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const boardApi = createApi({
    reducerPath: "boardApi",
    baseQuery: fetchBaseQuery({ 
        baseUrl: "http://localhost:8080/boards", 
        credentials: "include",
    }),
    tagTypes: ["Board"],
    endpoints: (builder) => ({
        getBoards: builder.query({
            query: () => ({
                url: "/",
                method: "GET",
            }),
            providesTags: ["Board"],
        }),
        createBoard: builder.mutation({
            query: (board) => ({
                url: "/",
                method: "POST",
                body: board,
            }),
            invalidatesTags: ["Board"],
        }),
    }),
});

export const { useGetBoardsQuery, useCreateBoardMutation } = boardApi;
