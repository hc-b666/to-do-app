import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "@services/userApi";
import { boardApi } from "@services/boardApi";
import { taskApi } from "@services/taskApi";
import authReducer from "@features/authSlice";
import modalReducer from "@features/modalSlice";
import boardReducer from "@features/boardSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        modal: modalReducer,
        board: boardReducer,
        [userApi.reducerPath]: userApi.reducer,
        [boardApi.reducerPath]: boardApi.reducer,
        [taskApi.reducerPath]: taskApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            userApi.middleware,
            boardApi.middleware,
            taskApi.middleware,
        ),
});

export type RootState = ReturnType<typeof store.getState>;
