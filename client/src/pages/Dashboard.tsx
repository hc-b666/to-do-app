import { toast } from "react-toastify";
import { useGetUserQuery } from "../services/userApi";
import Loading from "../components/Loading";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { AuthState } from "../features/authSlice";
import { useGetBoardsQuery } from "../services/boardApi";
import { setBoards } from "../features/boardSlice";

export default function Dashboard() {
    const dispatch = useDispatch();
    const { isLoading, isError, error } = useGetUserQuery();
    const { userInfo } = useSelector((state: RootState) => state.auth) as AuthState;
    
    const { data: boardsData, isSuccess } = useGetBoardsQuery();

    if (isSuccess) {
        dispatch(setBoards(boardsData.boards));
    }

    return (
        <>
            {isLoading && <Loading />}
            {isError && toast.error("Error occured")}
            <div className="flex h-screen w-full">
                <Sidebar />
                <main className="p-5 w-full">
                    <nav>

                    </nav>
                    current user is {userInfo?.username}
                </main>
            </div>
        </>
    );
}
