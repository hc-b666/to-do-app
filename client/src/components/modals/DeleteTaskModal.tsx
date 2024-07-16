import { FC } from "react";
import { toast } from "react-toastify";
import { Info, Plus } from "lucide-react";
import { TaskType } from "@/definitions";
import { useDeleteTaskMutation } from "@/services/tasksApi";
import { Modal } from "./Modal";
import { Button } from "../ui";

interface IDeleteTaskModal {
  task: TaskType;
  state: boolean;
  setState: (state: boolean) => void;
}

export const DeleteTaskModal: FC<IDeleteTaskModal> = ({
  task,
  state,
  setState,
}) => {
  const [deleteTask] = useDeleteTaskMutation();

  const handleDeleteTask = async () => {
    try {
      const res = await deleteTask(task.id).unwrap();
      
      if (res.status === 201) {
        toast.success(res.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal state={state} setState={setState}>
      <div className="flex w-[400px] flex-col gap-5">
        <div className="flex w-full items-center justify-between text-gray-700">
          <Info className="h-4 w-4" />
          <Plus
            className="h-4 w-4 rotate-45 cursor-pointer"
            onClick={() => setState(false)}
          />
        </div>
        <p>Are you sure you want to delete {task.title}</p>
        <div className="flex items-center gap-3 self-end">
          <Button onClick={() => setState(false)} type="button">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteTask}
            variant={"destructive"}
            type="button"
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};
