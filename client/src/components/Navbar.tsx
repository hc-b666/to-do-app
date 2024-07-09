import { FC } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TbLayoutSidebar } from "react-icons/tb";
import { MdOutlineTaskAlt } from "react-icons/md";
import { useGetTodayTasksLengthQuery } from "../services/tasksApi";

interface INavbar {
  sidebarState: boolean;
  setSidebarState: (state: boolean) => void;
}

export const Navbar: FC<INavbar> = ({ sidebarState, setSidebarState }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { data: todayTaskLengthData } = useGetTodayTasksLengthQuery(undefined);

  const todayDate = new Date();
  const formattedDate = `${todayDate.getDate()} ${todayDate.toLocaleString('en-US', { month: 'short' })}`;
  
  let breadcrumbText = "Today";
  const pathSegments = pathname.split("/").filter(Boolean);

  if (pathSegments.length > 1 && pathSegments[0] === "dashboard") {
    breadcrumbText = pathSegments[1].charAt(0).toUpperCase() + pathSegments[1].slice(1);
  }

  const signoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/signup");
  };

  const todayTasksText = todayTaskLengthData?.length ? (
    <div className="flex items-center gap-1">
      <MdOutlineTaskAlt />
      {`${todayTaskLengthData.length} task${todayTaskLengthData.length > 1 ? "s" : ""}`}
    </div>
  ) : "";

  return (
    <nav className="py-3 px-5 w-full flex items-center justify-between shadow">
      <div className="flex items-center gap-5">
        {!sidebarState && (
          <button onClick={() => setSidebarState(true)}>
            <TbLayoutSidebar className="text-gray-500 w-6 h-6" />
          </button>
        )}
        <p className="flex items-center gap-1">{breadcrumbText} - {formattedDate} - {todayTasksText}</p>
      </div>

      <button onClick={signoutHandler} className="text-white text-base font-semibold py-2 px-4 bg-purple-700 hover:bg-purple-500 rounded-lg duration-300">
        Sign Out  
      </button>
    </nav>
  );
};
