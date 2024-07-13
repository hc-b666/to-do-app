import { FC, useState } from "react";
import { NavLink } from "react-router-dom";
import { AddTaskModal } from "./add-task-modal";
import { PanelRight } from "lucide-react";
import { Button } from "@components/ui";
import { AddProjectModal } from "./add-project-modal";
import { useGetProjectsQuery } from "@services/projectsApi";
import { capitalize } from "@lib/capitalize";

interface ISidebar {
  sidebarState: boolean;
  setSidebarState: (state: boolean) => void;
}

export const Sidebar: FC<ISidebar> = ({ sidebarState, setSidebarState }) => {
  const [taskModal, setTaskModal] = useState(false);
  const [projectModal, setProjectModal] = useState(false);
  const { data: projectsData } = useGetProjectsQuery(undefined);

  const isActive = (pathname: string) => location.pathname === pathname;

  return (
    <>
      <aside
        className={`${sidebarState ? "w-[350px]" : "w-0 opacity-0"} flex min-h-screen flex-col shadow-lg transition-all duration-500 ease-in-out`}
      >
        <div
          className={`flex h-full flex-col p-6 ${sidebarState ? "opacity-100" : "pointer-events-none opacity-0"} transition-opacity duration-500 ease-in-out`}
        >
          <section className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium">To Do App</h3>
            <button onClick={() => setSidebarState(false)}>
              <PanelRight className="h-6 w-6 text-gray-500" />
            </button>
          </section>

          <section className="flex flex-col items-start gap-2">
            <NavLink
              to={"/dashboard"}
              className={`${isActive("/dashboard") ? "bg-purple-700 font-bold text-white hover:bg-purple-500" : "bg-white font-normal text-black hover:bg-gray-50"} flex w-full cursor-pointer items-center gap-3 rounded-lg px-4 py-2 duration-300`}
            >
              Today
            </NavLink>

            <NavLink
              to={"/dashboard/upcoming"}
              className={`${isActive("/dashboard/upcoming") ? "bg-purple-700 font-bold text-white hover:bg-purple-500" : "bg-white font-normal text-black hover:bg-gray-50"} flex w-full cursor-pointer items-center gap-3 rounded-lg px-4 py-2 duration-300`}
            >
              Upcoming
            </NavLink>

            <Button
              onClick={() => setTaskModal(true)}
              variant={"secondary"}
              className="w-full"
            >
              + Add Task
            </Button>

            <h5 className="text-sm font-bold text-black">My Projects</h5>
            {projectsData?.projects &&
              projectsData.projects.map((project) => (
                <NavLink
                  to={`/dashboard/projects/${project.id}`}
                  key={project.id}
                  className={`${isActive(`/dashboard/projects/${project.id}`) ? "bg-purple-700 font-bold text-white hover:bg-purple-500" : "bg-white font-normal text-black hover:bg-gray-50"} flex w-full cursor-pointer items-center gap-3 rounded-lg px-4 py-2 duration-300`}
                >
                  {capitalize(project.title)}
                </NavLink>
              ))}
            <Button
              onClick={() => setProjectModal(true)}
              variant={"secondary"}
              className="w-full"
            >
              + Create Project
            </Button>
          </section>
        </div>
      </aside>
      {taskModal && (
        <AddTaskModal taskModal={taskModal} setTaskModal={setTaskModal} />
      )}
      {projectModal && (
        <AddProjectModal
          projectModal={projectModal}
          setProjectModal={setProjectModal}
        />
      )}
    </>
  );
};
