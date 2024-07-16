import { useState } from "react";
import { Plus } from "lucide-react";
import { TaskCard } from "./TaskCard";
import { TaskType } from "@/definitions";
import { useGetTasksQuery } from "@/services/tasksApi";
import { AddTaskModal } from "@/components/modals";

export const Today = () => {
  const [taskModal, setTaskModal] = useState(false);
  const { data: tasksData, isLoading } = useGetTasksQuery(undefined);

  const totalTasks = tasksData?.tasks.length
    ? `${tasksData?.tasks.length} task${tasksData?.tasks.length > 1 ? "s" : ""}`
    : "";

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <main className="m-auto flex w-[756px] max-w-[756px] flex-grow flex-col gap-4 px-6 py-8">
        <h1 className="text-2xl font-bold">Today</h1>
        <p className="text-sm">{totalTasks}</p>

        <div className="h-full w-full">
          {tasksData?.tasks.length > 0 ? (
            <div className="flex flex-col items-start gap-1">
              {tasksData.tasks.map((task: TaskType) => (
                <TaskCard task={task} key={task.id} />
              ))}
              <button
                onClick={() => setTaskModal(true)}
                className="mt-3 flex items-center gap-3 rounded-lg px-4 py-1 text-gray-500 duration-300 hover:bg-purple-300 hover:text-purple-700"
                type="button"
              >
                <Plus size={24} />
                Add Task
              </button>
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <h4 className="text-xl font-medium">No tasks for today</h4>
                <button
                  onClick={() => setTaskModal(true)}
                  className="flex items-center gap-3 rounded-lg px-4 py-1 text-gray-500 duration-300 hover:bg-purple-300 hover:text-purple-700"
                  type="button"
                >
                  <Plus size={24} />
                  Add Task
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      {taskModal && (
        <AddTaskModal taskModal={taskModal} setTaskModal={setTaskModal} />
      )}
    </>
  );
};
