import { createSlice } from "@reduxjs/toolkit";

interface BoardTypes {
    title: string;
};

export interface BoardState {
    boards: BoardTypes[];
    currentBoard: BoardTypes | null;
    currentBoardId: string;
};

const boardSlice = createSlice({
    name: "board",
    initialState: {
        boards: [],
        currentBoard: null,
        currentBoardId: "",
    },
    reducers: {
        setBoards: (state, action) => {
            state.boards = action.payload;
        },
        setCurrentBoard: (state, action) => {
            state.currentBoard = action.payload;
        },
        setCurrentBoardId: (state, action) => {
            state.currentBoardId = action.payload;
        },
        resetBoards: (state) => {
            state.boards = [];
            state.currentBoard = null;
            state.currentBoardId = "";
        }
    },
});

export const { setBoards, setCurrentBoard, setCurrentBoardId, resetBoards } = boardSlice.actions;
export default boardSlice.reducer;
