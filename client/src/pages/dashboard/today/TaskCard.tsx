import { useState } from "react";
import { TaskType } from "@/definitions";
import { Clock, Trash, Pencil } from "lucide-react";
import { DeleteTaskModal } from "@/components/modals";

export const TaskCard = ({ task }: { task: TaskType }) => {
  const [deleteTaskModal, setDeleteTaskModal] = useState(false);

  const deadlineDate = new Date(task.deadline);
  const formattedTime = `${deadlineDate.getHours().toString().padStart(2, "0")}:${deadlineDate.getMinutes().toString().padStart(2, "0")}`;

  return (
    <>
      <div className="flex w-full gap-8 border-b px-1 py-2">
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

        <div className="flex w-full justify-between">
          <div className="flex flex-col">
            <h5 className="text-sm">{task.title}</h5>
            <p className="text-xs">{task.description}</p>
            <div className="mt-2 flex items-center gap-1 text-xs">
              <Clock className="h-3 w-3" />
              <p>{formattedTime}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 self-end text-gray-500">
            <Pencil className="h-4 w-4 cursor-pointer" />
            <Trash
              className="h-4 w-4 cursor-pointer"
              onClick={() => setDeleteTaskModal(true)}
            />
          </div>
        </div>
      </div>
      {deleteTaskModal && (
        <DeleteTaskModal
          task={task}
          state={deleteTaskModal}
          setState={setDeleteTaskModal}
        />
      )}
    </>
  );
};