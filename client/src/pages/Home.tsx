import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { AuthState } from "../features/authSlice";

export default function Home() {
    const { userInfo } = useSelector((state: RootState) => state.auth) as AuthState;

    return (
        <div className="px-20 py-5 w-full h-auto">
            Welcome {userInfo?.username}
        </div>
    );
}
