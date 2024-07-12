import { FC } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { PanelRight, LogOut } from "lucide-react";
import { useGetTodayTasksLengthQuery } from "@services/tasksApi";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import { capitalize } from "@lib/capitalize";

interface INavbar {
  sidebarState: boolean;
  setSidebarState: (state: boolean) => void;
}

export const Navbar: FC<INavbar> = ({ sidebarState, setSidebarState }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { data: todayTaskLengthData } = useGetTodayTasksLengthQuery(undefined);

  const todayDate = new Date();
  const formattedDate = `${todayDate.getDate()} ${todayDate.toLocaleString("en-US", { month: "short" })}`;

  let breadcrumbText = "Today";
  const pathSegments = pathname.split("/").filter(Boolean);

  if (pathSegments.length > 1 && pathSegments[0] === "dashboard") {
    breadcrumbText = capitalize(pathSegments[1]);
  }

  const signoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/signup");
  };

  const todayTasksText = todayTaskLengthData?.length ? (
    <div className="flex items-center gap-1">
      -
      {` ${todayTaskLengthData.length} task${todayTaskLengthData.length > 1 ? "s" : ""}`}
    </div>
  ) : (
    ""
  );

  return (
    <nav className="flex w-full items-center justify-between px-5 py-3 shadow">
      <div className="flex items-center gap-5">
        {!sidebarState && (
          <button onClick={() => setSidebarState(true)}>
            <PanelRight className="h-6 w-6 text-gray-500" />
          </button>
        )}
        <p className="flex items-center gap-1">
          {breadcrumbText} - {formattedDate} {todayTasksText}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <ModeToggle />
        <Button onClick={signoutHandler} variant={"default"}>
          <LogOut className="mr-2 h-5 w-5" /> Sign Out
        </Button>
      </div>
    </nav>
  );
};
