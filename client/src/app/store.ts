import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "../services/userApi";
import { boardApi } from "../services/boardApi";
import LoadingSlice from "../features/loading";

export const store = configureStore({
    reducer: {
        loading: LoadingSlice,
        [userApi.reducerPath]: userApi.reducer,
        [boardApi.reducerPath]: boardApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(userApi.middleware, boardApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
