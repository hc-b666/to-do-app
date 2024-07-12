import { FC, useState } from "react";
import { NavLink } from "react-router-dom";
import { AddTaskModal } from "./add-task-modal";
import { Calendar, PanelRight } from "lucide-react";
import { Button } from "@components/ui/button";
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
              className="flex w-full cursor-pointer items-center gap-3 py-2 text-muted-foreground duration-300 hover:text-gray-700"
            >
              <Calendar className="h-6 w-6" />
              <p>Today</p>
            </NavLink>

            <NavLink
              to={"/dashboard/upcoming"}
              className="flex w-full cursor-pointer items-center gap-3 py-2 text-muted-foreground duration-300 hover:text-gray-700"
            >
              <Calendar className="h-6 w-6" />
              <p>Upcoming</p>
            </NavLink>

            <Button
              onClick={() => setTaskModal(true)}
              variant={"default"}
              className="w-full"
            >
              + Add Task
            </Button>

            <h5 className="text-sm font-normal text-gray-700">Projects</h5>
            {projectsData?.projects &&
              projectsData.projects.map((project) => (
                <NavLink
                  to={`/dashboard/project/${project.id}`}
                  key={project.id}
                  className="flex w-full cursor-pointer items-center gap-3 py-2 text-muted-foreground duration-300 hover:text-gray-700"
                >
                  <p>{capitalize(project.title)}</p>
                </NavLink>
              ))}
            <Button
              onClick={() => setProjectModal(true)}
              variant={"default"}
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
