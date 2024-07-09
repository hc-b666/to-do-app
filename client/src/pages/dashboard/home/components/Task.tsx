import { FC } from "react";
import { Draggable } from "react-beautiful-dnd";
import { IoMdTime } from "react-icons/io";

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
        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className="p-4 border rounded-lg cursor-pointer">
          <h1>{task.title}</h1>
          <div className="text-sm flex items-center gap-1">
            <IoMdTime className="text-base" />
            <p>{formattedTime}</p>
          </div>
        </div>
      )}
    </Draggable>
  );
};
