import { FC } from "react";
import { Droppable } from "react-beautiful-dnd";
import { capitalize } from "../../../../lib/capitalize";
import { TaskCard } from "./Task";

interface Task {
  id: number;
  title: string;
  description: string;
  deadline: string;
  status: string;
}

interface IStatusColumn {
  status: string;
  tasks: Task[] | undefined;
}

export const StatusColumn: FC<IStatusColumn> = ({ status, tasks }) => {

  return (
    <div className="px-5 w-[350px] h-full border-x">
      <h1 className="text-2xl mb-5">{capitalize(status)}</h1>

      <Droppable droppableId={status}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="h-full flex flex-col gap-3">
            {tasks && (
              tasks.map((task, index: number) => (
                <TaskCard task={task} index={index} key={task.id} />
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

