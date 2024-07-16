import { FC } from "react";
import { Clock } from "lucide-react";
import { TaskType } from "@/definitions";

interface ITaskCard {
  task: TaskType;
}

export const UpcomingTaskCard: FC<ITaskCard> = ({ task }) => {
  const deadlineDate = new Date(task.deadline);
  const formattedTime = `${deadlineDate.getHours().toString().padStart(2, "0")}:${deadlineDate.getMinutes().toString().padStart(2, "0")}`;

  return (
    <div
      key={task.id}
      className="cursor-pointer rounded-2xl border bg-white px-4 py-3 shadow dark:bg-black"
    >
      <h4 className="text-sm">{task.title}</h4>
      <p className="text-xs text-gray-500">{task.description}</p>
      <div className="mt-2 flex items-center gap-1 text-xs">
        <Clock className="h-3 w-3" />
        <p>{formattedTime}</p>
      </div>
    </div>
  );
};
