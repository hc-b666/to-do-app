import { configureStore } from "@reduxjs/toolkit";
import { authApi, tasksApi, projectsApi } from "@/services";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
    [projectsApi.reducerPath]: projectsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      tasksApi.middleware,
      projectsApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
