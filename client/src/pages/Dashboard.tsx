import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../app/store";
import { useGetUserQuery } from "@services/userApi";
import { useGetBoardsQuery } from "@services/boardApi";
import { AuthState } from "@features/authSlice";
import { setBoards } from "@features/boardSlice";
import Loading from "@components/Loading";
import Sidebar from "@components/Sidebar";
import Button from "@components/ui/Button";

export default function Dashboard() {
    const dispatch = useDispatch();
    const { isLoading, isError, error } = useGetUserQuery();
    const { userInfo } = useSelector(
        (state: RootState) => state.auth,
    ) as AuthState;

    const { data: boardsData, isSuccess } = useGetBoardsQuery();

    if (isSuccess) {
        dispatch(setBoards(boardsData.boards));
    }

    return (
        <>
            {isLoading && <Loading />}
            {isError && toast.error("Error occured")}
            <div className="flex h-screen w-full bg-white dark:bg-slate-900 text-white">
                <Sidebar />
                <main className="w-full p-5">
                    <nav></nav>
                    current user is {userInfo?.username}
                    <div className="flex flex-col items-start">
                        <Button variant="primary">primary</Button>
                        <Button variant="secondary">secondary</Button>
                    </div>
                </main>
            </div>
        </>
    );
}
