import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { BoardState, setCurrentBoard } from "@features/boardSlice";

interface BoardProps {
    board: {
        _id: string;
        title: string;
    };
}

export default function Board({ board }: BoardProps) {
    const dispatch = useDispatch();
    const { _id, title } = board;
    const { currentBoardId } = useSelector(
        (state: RootState) => state.board,
    ) as BoardState;

    return (
        <div
            onClick={() => dispatch(setCurrentBoard(board))}
            className={`board ${
                currentBoardId === _id ? "bg-blue-500 text-white" : ""
            }`}
        >
            <h2>{title}</h2>
        </div>
    );
}
