import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message: "",
    type: "",
    duration: 5,
    isOpen: false,
};

const toastSlice = createSlice({
    name: "toast",
    initialState,
    reducers: {
        openToast(state, action) {          
            state.message = action.payload.message;
            state.type = action.payload.type;
            state.isOpen = true;
        },
        closeToast(state) {
            state.isOpen = false;
        },
    },
});

export const { openToast, closeToast } = toastSlice.actions;
export default toastSlice.reducer;
