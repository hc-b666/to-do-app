import { useGetUpcomingTasksQuery } from "@/services/tasksApi";
import { generateDates } from "@/lib/generateDates";
import { TaskType } from "@/definitions";
import { UpcomingTaskColumn } from "./UpcomingTaskColumn";

export const Upcoming = () => {
  const { data: upcomingTasksData } = useGetUpcomingTasksQuery(undefined);
  const dates = generateDates();

  return (
    <div className="flex flex-grow flex-col pt-8">
      <h1 className="mb-5 px-8 text-2xl font-bold">Upcoming</h1>
      <div className="flex-grow overflow-x-auto border-t py-5">
        <div className="flex w-max items-start gap-12 px-8">
          {dates.map((date, index) => (
            <UpcomingTaskColumn
              date={date}
              tasks={upcomingTasksData?.tasks.filter((task: TaskType) => {
                const taskDate = new Date(task.deadline)
                  .toISOString()
                  .split("T")[0];
                const columnDate = new Date(date).toISOString().split("T")[0];
                return taskDate === columnDate;
              })}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
