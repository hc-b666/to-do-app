import { FC, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { usePostTaskMutation } from "@/services/tasksApi";
import { TaskSchema } from "@/schemas/task.schema";
import { parseTimeFromTitle } from "@/lib/parseTimeFromTitle";
import { Modal } from "@/components/modals";
import { Button } from "@/components/ui";

interface IAddTaskModal {
  taskModal: boolean;
  setTaskModal: (state: boolean) => void;
}

export const AddTaskModal: FC<IAddTaskModal> = ({
  taskModal,
  setTaskModal,
}) => {
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [postTask] = usePostTaskMutation();

  useEffect(() => {
    const parsedDeadline = parseTimeFromTitle(title);
    if (parsedDeadline) {
      setDeadline(parsedDeadline);
    }
  }, [title]);

  const createTaskHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    try {
      const validatedData = TaskSchema.safeParse({
        title: data.title,
        description: data.description,
        deadline: data.deadline,
        status: 0,
      });

      if (validatedData.success === true) {
        const res = await postTask({
          title: validatedData.data.title,
          description: validatedData.data.description,
          deadline: validatedData.data.deadline,
          status: validatedData.data.status,
        }).unwrap();

        if (res.status === 201) {
          setTaskModal(false);
          toast.success(res.message);
        }
      } else if (validatedData.success === false) {
        toast.error(validatedData.error.errors[0].message);
      }
    } catch (error) {
      console.log(error);
      const typedError = error as { status?: number; data?: { error: string } };

      if (typedError.status) {
        if (typedError.data && typedError.data.error) {
          toast.error(typedError.data.error);
        }
      }
    }
  };

  return (
    <Modal state={taskModal} setState={setTaskModal}>
      <form
        onSubmit={createTaskHandler}
        className="flex w-[550px] flex-col items-start bg-white dark:bg-black"
      >
        <input
          name="title"
          id="title"
          type="text"
          placeholder="Title"
          className="w-full bg-transparent text-2xl"
          onChange={(e) => setTitle(e.currentTarget.value)}
        />

        <input
          name="description"
          id="description"
          type="text"
          placeholder="Description"
          className="w-full bg-transparent text-sm"
        />

        <div className="mt-3 grid grid-cols-3 gap-4">
          <input
            name="deadline"
            id="deadline"
            type="datetime-local"
            value={deadline}
            className="cursor-pointer rounded-lg border-2 text-sm shadow"
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>

        <div className="mt-3 flex w-full justify-end gap-3 border-t pt-3">
          <Button onClick={() => setTaskModal(false)} type="button">
            Cancel
          </Button>
          <Button variant={"secondary"} type="submit">
            Add Task
          </Button>
        </div>
      </form>
    </Modal>
  );
};
