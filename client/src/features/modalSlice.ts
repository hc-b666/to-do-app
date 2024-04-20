import { createSlice } from "@reduxjs/toolkit";

interface ModalInput {
    type: "text" | "email" | "password";
    name: string;
    autoComplete?: string;
};

export interface ModalState {
    isOpen: boolean;
    title: string;
    modalInputs: ModalInput[];
    formType: "addBoard";
};

const modalSlice = createSlice({
    name: "modal",
    initialState: {
        isOpen: false,
        title: "",
        modalInputs: [],
        formType: "",
    },
    reducers: {
        showModal: (state, action) => {
            state.isOpen = true;
            state.title = action.payload.title;
            state.modalInputs = action.payload.inputs;
            state.formType = action.payload.formType;
        },
        hideModal: (state) => {
            state.isOpen = false;
            state.title = "";
            state.modalInputs = [];
            state.formType = "";
        },
    },
});

export const { showModal, hideModal } = modalSlice.actions;
export default modalSlice.reducer;
