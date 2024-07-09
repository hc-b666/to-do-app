import { DragDropContext } from "react-beautiful-dnd";
import { useGetStatusesQuery, useGetTasksQuery, useUpdateTaskStatusMutation } from "@services/tasksApi";
import { StatusColumn } from "./components/StatusColumn";

// ToDo - Fix bug in dnd
export const Home = () => {
  const { data: statusesData } = useGetStatusesQuery(undefined);
  const { data: tasksData } = useGetTasksQuery(undefined);
  const [updateTask] = useUpdateTaskStatusMutation();

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const startStatus = source.droppableId;
    const endStatus = destination.droppableId;

    if (startStatus === endStatus) {
      const newTaskIds = Array.from(tasksData?.tasks.filter((task) => task.status === startStatus) || []).map((task) => task.id);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      return;
    }

    const startTasks = tasksData?.tasks.filter((task) => task.status === startStatus) || [];
    const endTasks = tasksData?.tasks.filter((task) => task.status === endStatus) || [];

    const newStartTasks = Array.from(startTasks);
    newStartTasks.splice(source.index, 1);

    const newEndTasks = Array.from(endTasks);
    newEndTasks.splice(destination.index, 0, tasksData?.tasks.find((task) => task.id === draggableId));

    console.log(result)
    console.log(newEndTasks)

    updateTask({ id: draggableId, status: endStatus });
  };

  return (
    <main className="p-10 flex-grow flex items-start gap-10 overflow-hidden">
      <DragDropContext onDragEnd={onDragEnd}>
        {statusesData?.statusSegments.map((status: string, index: number) => (
          <StatusColumn status={status} tasks={tasksData?.tasks.filter((task) => task.status === status)} key={index} />
        ))}
      </DragDropContext>
    </main>
  );
};
