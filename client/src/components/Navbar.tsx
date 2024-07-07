import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  const signoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/signup");
  };

  return (
    <nav className="py-3 px-5 w-full flex items-center justify-between shadow">
      /navbar

      <button onClick={signoutHandler} className="text-white text-base font-semibold py-2 px-4 bg-purple-700 hover:bg-purple-500 rounded-lg duration-300">
        Sign Out
      </button>
    </nav>
  );
};
