import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../app/store";
import { useSignoutMutation } from "@services/userApi";
import { logout } from "@features/authSlice";
import Button from "./ui/Button";

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
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message);
        }
    }, [isSuccess]);

    return (
        <nav className="flex w-full items-center justify-between bg-white px-20 py-4 shadow shadow-black dark:bg-slate-900 dark:text-white dark:shadow-slate-100">
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
                    <Button onClick={handleSignOut}>Sign Out</Button>
                </div>
            ) : (
                <div className="flex gap-3">
                    <Button onClick={() => navigate("/signin")}>Sign In</Button>
                    <Button
                        variant="secondary"
                        onClick={() => navigate("/signup")}
                    >
                        Sign Up
                    </Button>
                </div>
            )}
        </nav>
    );
}
