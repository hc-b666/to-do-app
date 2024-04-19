import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "../services/userApi";
import toastReducer from "../features/toast";

export const store = configureStore({
    reducer: {
        toast: toastReducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
