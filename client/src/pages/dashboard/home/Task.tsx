import { FC } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Clock } from "lucide-react";

interface Task {
  id: number;
  title: string;
  description: string;
  deadline: string;
  status: string;
}

interface ITaskCard {
  task: Task;
  index: number;
}

export const TaskCard: FC<ITaskCard> = ({ task, index }) => {
  const deadlineDate = new Date(task.deadline);
  const formattedTime = `${deadlineDate.getHours().toString().padStart(2, '0')}:${deadlineDate.getMinutes().toString().padStart(2, '0')}`;

  return (
    <Draggable draggableId={String(task.id)} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className={`${task.status === "done" ? "text-gray-500" : ""} p-4 bg-white dark:bg-black border rounded-2xl shadow cursor-pointer`}>
          <h4 className={`${task.status === "done" ? "line-through" : ""} text-sm`}>{task.title}</h4>
          <p className={`${task.status === "done" ? "line-through" : ""} text-gray-500 text-xs`}>{task.description}</p>
          <div className="text-xs mt-2 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <p>{formattedTime}</p>
          </div>
        </div>
      )}
    </Draggable>
  );
};
