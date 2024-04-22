import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/app/store";
import { useGetBoardsQuery } from "@services/boardApi";
import { useGetTasksQuery } from "@services/taskApi";
import { setBoards } from "@features/boardSlice";
import Sidebar from "@components/Sidebar";

interface Task {
    _id: string;
    title: string;
    description: string;
    status: boolean;
    boardId: string;
}

export default function Dashboard() {
    const dispatch = useDispatch();
    const { currentBoardId } = useSelector((state: RootState) => state.board);

    const { data: boardsData, isSuccess: bsucc } = useGetBoardsQuery();

    const { data: taskData, isSuccess: taskSuccess } = currentBoardId
        ? useGetTasksQuery(currentBoardId)
        : { data: [], isSuccess: false };

    const [tasks, setTasks] = useState(taskData);

    useEffect(() => {
        if (taskSuccess) {
            setTasks(taskData);
        }
    }, [taskSuccess]);

    useEffect(() => {
        if (bsucc) {
            dispatch(setBoards(boardsData.boards));
        }
    }, [bsucc, boardsData]);

    return (
        <>
            <div className="flex h-screen w-full bg-white text-white dark:bg-slate-900">
                <Sidebar />
                <main className="w-full p-5">
                    <nav></nav>
                    <div className="flex h-full flex-grow items-center justify-center">
                        {tasks.length > 0 ? (
                            tasks.map((task: Task) => (
                                <div key={task._id}>
                                    <h1>{task.title}</h1>
                                    <p>{task.description}</p>
                                </div>
                            ))
                        ) : (
                            <h1>Choose a board to see tasks</h1>
                        )}
                    </div>
                </main>
            </div>
        </>
    );
}
