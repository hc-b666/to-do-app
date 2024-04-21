import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: localStorage.getItem("userId")
        ? JSON.parse(localStorage.getItem("userId"))
        : null,
    userInfo: null,
};

export interface AuthState {
    userId: string;
    userInfo: {
        username: string;
        email: string;
        __v: number;
        _id: string;
    } | null;
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem("userId", JSON.stringify(action.payload._id));
        },
        logout: (state) => {
            state.userInfo = null;
            localStorage.removeItem("userId");
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
