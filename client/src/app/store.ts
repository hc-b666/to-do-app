import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "../services/userApi";
import { boardApi } from "../services/boardApi";
import authReducer from "../features/authSlice";
import modalReducer from "../features/modalSlice";
import boardReducer from "../features/boardSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        modal: modalReducer,
        board: boardReducer,
        [userApi.reducerPath]: userApi.reducer,
        [boardApi.reducerPath]: boardApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(userApi.middleware, boardApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
