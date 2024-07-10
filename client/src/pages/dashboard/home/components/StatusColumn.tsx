import { FC } from "react";
import { Droppable } from "react-beautiful-dnd";
import { capitalize } from "@lib/capitalize";
import { TaskCard } from "./Task";
import styles from "./StatusColumn.module.css";

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
    <div className={styles["column"]}>
      <div className={styles["column-header"]}>
        <h1 className={styles["column-title"]}>{capitalize(status)}</h1>
        <p className={styles["column-subtitle"]}>{totalTasks}</p>
      </div>

      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className={`${snapshot.isDraggingOver ? "bg-gray-50 dark:bg-gray-900" : "bg-white dark:bg-gray-950"} ${styles["tasks-wrap"]} scrollbar`}>
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

