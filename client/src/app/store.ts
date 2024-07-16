import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "@/services/authApi";
import { tasksApi } from "@/services/tasksApi";
import { projectsApi } from "@/services/projectsApi";

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
