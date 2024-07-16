import { useState } from "react";
import { Plus, Clock } from "lucide-react";
import { useGetTasksQuery } from "@/services/tasksApi";
import { AddTaskModal } from "@/components/modals";

type Task = {
  id: number;
  title: string;
  description: string;
  deadline: string;
  status: 0 | 1;
};

export const Today = () => {
  const [taskModal, setTaskModal] = useState(false);
  const { data: tasksData, isLoading } = useGetTasksQuery(undefined);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <main className="m-auto w-[756px] max-w-[756px] flex-grow px-6 py-12">
        <h1 className="mb-5 text-2xl font-bold">Today</h1>

        <div className="h-full w-full">
          {tasksData?.tasks.length > 0 ? (
            <div className="flex flex-col gap-1">
              {tasksData.tasks.map((task: Task) => (
                <TaskCard task={task} key={task.id} />
              ))}
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

const TaskCard = ({ task }: { task: Task }) => {
  const deadlineDate = new Date(task.deadline);
  const formattedTime = `${deadlineDate.getHours().toString().padStart(2, "0")}:${deadlineDate.getMinutes().toString().padStart(2, "0")}`;

  return (
    <div className="flex gap-8 border-b px-1 py-2">
      {/* ToDo - Change the style of checkbox */}
      <div className="flex items-start">
        <label className="relative inline-block cursor-pointer">
          <input
            type="checkbox"
            checked={task.status === 1 ? true : false}
            className="peer sr-only"
          />
          <span className="absolute left-0 top-0 h-5 w-5 rounded-full border border-gray-500 peer-checked:bg-blue-600"></span>
        </label>
      </div>
      <div className="flex flex-col">
        <h5 className="text-sm">{task.title}</h5>
        <p className="text-xs">{task.description}</p>
        <div className="mt-2 flex items-center gap-1 text-xs">
          <Clock className="h-3 w-3" />
          <p>{formattedTime}</p>
        </div>
      </div>
    </div>
  );
};
