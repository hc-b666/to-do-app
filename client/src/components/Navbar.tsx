import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useSignoutMutation } from "../services/userApi";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { logout } from "../features/authSlice";

const links = [
    { title: "Home", path: "/" },
    { title: "Dashboard", path: "/dashboard" },
];

export default function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const [signout, { data, isSuccess, error }] = useSignoutMutation();

    const handleSignOut = async () => {
        try {
            const res = await signout().unwrap();
            dispatch(logout());
        } catch (err) {
            toast.error(error?.data?.message || err.error);
        }
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message);
        }
    }, [isSuccess]);

    return (
        <nav className="flex w-full items-center justify-between px-20 py-4 shadow">
            <NavLink to={"/"} className="flex gap-1">
                <img
                    className="h-12 w-12 rounded"
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"
                />
                <div className="flex flex-col font-medium">
                    <h4 className="text-lg">ToDoApp</h4>
                    <p className="text-xs">Created with TypeScript</p>
                </div>
            </NavLink>

            {userInfo ? (
                <div className="flex gap-5">
                    {links.map((link) => (
                        <NavLink to={link.path} key={link.title}>
                            {link.title}
                        </NavLink>
                    ))}
                </div>
            ) : null}

            {userInfo ? (
                <div>
                    <button onClick={handleSignOut}>
                        Sign Out
                    </button>
                </div>
            ) : (
                <div className="flex gap-3">
                    <button onClick={() => navigate("/signin")}>Sign In</button>
                    <button onClick={() => navigate("/signup")}>Sign Up</button>
                </div>
            )}
        </nav>
    );
}
