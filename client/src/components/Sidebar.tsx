import { useState } from "react";
import { useGetBoardsQuery } from "../services/boardApi";
import Board from "./Board";

export default function Sidebar() {
    const { data } = useGetBoardsQuery();
    const [current, setCurrent] = useState<string | null>(null);

    const handleChooseBoard = (id: string) => {
        setCurrent(id);
    };

    return (
        <aside className="w-[300px] h-full flex flex-col shadow">
            <div className="self-start pl-5 py-4">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
            </div>

            <div>
                <div className="pl-5 py-4">
                    <h1 className="font-semibold">
                        All Boards({data?.boards?.length})
                    </h1>
                </div>
                <div className="flex flex-col">
                    {data?.boards?.map((board: any) => (
                        <Board
                            board={board}
                            key={board._id}
                            handleChooseBoard={handleChooseBoard}
                            current={current}
                        />
                    ))}

                    <div className="board">
                        <h2>Create New Board</h2>
                    </div>
                </div>
            </div>
        </aside>
    );
}
