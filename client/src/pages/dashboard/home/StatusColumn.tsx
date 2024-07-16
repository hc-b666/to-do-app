import { FC } from "react";
import { Droppable } from "react-beautiful-dnd";
import { capitalize } from "@/lib/capitalize";
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
  const totalTasks = tasks?.length ? `${tasks.length} task${tasks.length > 1 ? "s" : ""}` : "";

  return (
    <div className="w-[300px] h-full">
      <div className="px-3 mb-3">
        <h1 className="text-xl font-bold">{capitalize(status)}</h1>
        <p className="text-sm">{totalTasks}</p>
      </div>

      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className={`${snapshot.isDraggingOver ? "bg-gray-50 dark:bg-gray-900" : "bg-white dark:bg-gray-950"} p-3 h-full rounded-lg flex flex-col gap-3 overflow-y-auto scrollbar`}>
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
