import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { AuthState } from "@features/authSlice";

export default function Home() {
    const { userInfo } = useSelector(
        (state: RootState) => state.auth,
    ) as AuthState;

    return (
        <div className="h-auto w-full flex-grow bg-white px-20 py-5 text-black dark:bg-slate-900 dark:text-white">
            Welcome {userInfo?.username}
        </div>
    );
}
