import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { showModal } from "@features/modalSlice";
import { BoardState } from "@features/boardSlice";
import Board from "./Board";
import Button from "./ui/Button";
import { useTheme } from "../layouts/ThemeProvider";

export default function Sidebar() {
    const dispatch = useDispatch();
    const { handleTheme } = useTheme();

    const { boards, currentBoardId } = useSelector(
        (state: RootState) => state.board,
    ) as BoardState;

    const handleModal = () => {
        dispatch(
            showModal({
                title: "Create New Board",
                inputs: [{ name: "title", type: "text" }],
                formType: "addBoard",
            }),
        );
    };

    return (
        <aside className="flex h-full w-[300px] flex-col bg-white text-black shadow dark:bg-slate-900 dark:text-white dark:shadow-slate-500">
            <div className="self-start py-4 pl-5">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
            </div>

            <div>
                <div className="py-4 pl-5">
                    <h1 className="font-semibold">
                        All Boards({boards?.length})
                    </h1>
                </div>
                <div className="flex flex-col">
                    {boards?.map((board: any) => (
                        <Board board={board} key={board._id} />
                    ))}

                    <div
                        onClick={handleModal}
                        className="board font-semibold text-blue-500"
                    >
                        <h2>Create New Board</h2>
                    </div>
                </div>
                <Button onClick={handleTheme}>Dark Mode</Button>
            </div>
        </aside>
    );
}
