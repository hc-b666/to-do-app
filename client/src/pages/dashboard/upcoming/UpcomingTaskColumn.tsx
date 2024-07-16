import { FC, useState } from "react";
import { Dot, Plus } from "lucide-react";
import { AddTaskModal } from "@/components/modals";
import { TaskType } from "@/definitions";
import { UpcomingTaskCard } from "./UpcomingTaskCard";

interface IUpcomingTaskColumn {
  date: string;
  tasks: TaskType[];
}

export const UpcomingTaskColumn: FC<IUpcomingTaskColumn> = ({
  date,
  tasks,
}) => {
  const [taskModal, setTaskModal] = useState(false);

  const parsedDate = new Date(date);
  const dayOfMonth = parsedDate.getDate();
  const month = parsedDate.toLocaleString("en-US", { month: "short" });

  let columnHeader;

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  if (parsedDate.toDateString() === new Date().toDateString()) {
    columnHeader = "Today";
  } else if (
    parsedDate.toDateString() ===
    new Date(new Date().setDate(new Date().getDate() + 1)).toDateString()
  ) {
    columnHeader = "Tomorrow";
  } else {
    const dayOfWeek = daysOfWeek[parsedDate.getDay()];
    columnHeader = dayOfWeek;
  }

  return (
    <>
      <div className="w-[240px]">
        <h4 className="mb-5 flex items-center text-sm font-bold">
          {dayOfMonth} {month} <Dot /> {columnHeader}{" "}
          <span className="ml-2 font-normal text-gray-400">
            {tasks?.length}
          </span>
        </h4>
        {tasks && tasks.length > 0 ? (
          <div className="flex flex-col gap-3">
            {tasks.map((task) => (
              <UpcomingTaskCard task={task} key={task.id} />
            ))}
            <button
              onClick={() => setTaskModal(true)}
              className="mt-2 flex items-center gap-3 rounded-lg px-4 py-1 text-gray-500 duration-300 hover:bg-purple-300 hover:text-purple-700"
              type="button"
            >
              <Plus size={24} />
              Add Task
            </button>
          </div>
        ) : (
          <button
            onClick={() => setTaskModal(true)}
            className="flex items-center gap-3 rounded-lg px-4 py-1 text-gray-500 duration-300 hover:bg-purple-300 hover:text-purple-700"
            type="button"
          >
            <Plus size={24} />
            Add Task
          </button>
        )}
      </div>
      {taskModal && (
        <AddTaskModal taskModal={taskModal} setTaskModal={setTaskModal} />
      )}
    </>
  );
};
