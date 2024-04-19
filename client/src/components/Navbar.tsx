import { NavLink, useNavigate } from "react-router-dom";
import { useGetUserQuery } from "../services/userApi";

const links = [
    { title: "Home", path: "/" },
    { title: "Dashboard", path: "/dashboard" },
];

export default function Navbar() {
    const navigate = useNavigate();
    const { data: user, isError } = useGetUserQuery();

    return (
        <nav className="w-full px-20 py-4 shadow flex items-center justify-between">
            <NavLink to={"/"} className="flex gap-1">
                <img
                    className="w-12 h-12 rounded"
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"
                />
                <div className="font-medium flex flex-col">
                    <h4 className="text-lg">ToDoApp</h4>
                    <p className="text-xs">Created with TypeScript</p>
                </div>
            </NavLink>

            <div className="flex gap-5">
                {links.map((link) => (
                    <NavLink to={link.path} key={link.title}>
                        {link.title}
                    </NavLink>
                ))}
            </div>

            {isError ? null : (
                <div className="flex gap-3">
                    <button onClick={() => navigate("/signin")}>Sign In</button>
                    <button onClick={() => navigate("/signup")}>Sign Up</button>
                </div>
            )}
        </nav>
    );
}
