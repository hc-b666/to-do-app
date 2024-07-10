import { FC, useState } from "react";
import { NavLink } from "react-router-dom";
import { TbLayoutSidebar, TbCalendar, TbCalendarWeek } from "react-icons/tb";
import { AddTaskModal } from "./add-task-modal";
import { Button } from "@components/ui/button";

interface ISidebar {
  sidebarState: boolean;
  setSidebarState: (state: boolean) => void;
}

export const Sidebar: FC<ISidebar> = ({ sidebarState, setSidebarState }) => {
  const [taskModal, setTaskModal] = useState(false);
  
  return (
    <>
      <aside className={`${sidebarState ? "w-[350px]" : "w-0 opacity-0"}  min-h-screen flex flex-col shadow-lg duration-500 transition-all ease-in-out`}>
        <div className={`h-full flex flex-col p-6 ${sidebarState ? "opacity-100" : "opacity-0 pointer-events-none"} transition-opacity duration-500 ease-in-out`}>
          <section className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium">To Do App</h3>
            <button onClick={() => setSidebarState(false)}>
              <TbLayoutSidebar className="text-gray-500 w-6 h-6" />
            </button>
          </section>

          <section className="flex flex-col items-start gap-2">
            <NavLink to={"/dashboard"} className="text-gray-400 hover:text-gray-700 py-2 w-full flex items-center gap-3 cursor-pointer duration-300">
              <TbCalendar className="w-6 h-6" />
              <p>Today</p>
            </NavLink>
            
            <NavLink to={"/dashboard/upcoming"} className="text-gray-400 hover:text-gray-700 py-2 w-full flex items-center gap-3 cursor-pointer duration-300">
              <TbCalendarWeek className="w-6 h-6" />
              <p>Upcoming</p>
            </NavLink>

            <Button onClick={() => setTaskModal(true)} variant={"default"} className="w-full">+ Add Task</Button>

            <h5 className="text-gray-700 text-sm font-normal">Projects</h5>
            <Button variant={"default"} className="w-full">+ Create Project</Button>
          </section>

          <section className="mt-auto">
            Theme Toggle
          </section>
        </div>
      </aside>
      {taskModal && <AddTaskModal taskModal={taskModal} setTaskModal={setTaskModal} />}
    </>
  );
}
