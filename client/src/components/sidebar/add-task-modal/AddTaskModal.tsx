import { FC, useState, useEffect } from "react";
import { useGetStatusesQuery, usePostTaskMutation } from "@services/tasksApi";
import { capitalize } from "@lib/capitalize";
import { parseTimeFromTitle } from "@lib/parseTimeFromTitle";
import Modal from "@components/Modal";
import { Button } from "@components/ui/button";

interface IAddTaskModal {
  taskModal: boolean;
  setTaskModal: (state: boolean) => void;
}

export const AddTaskModal: FC<IAddTaskModal> = ({ taskModal, setTaskModal }) => {
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const { data: statusesData } = useGetStatusesQuery(undefined);
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
      const res = await postTask(data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal state={taskModal} setState={setTaskModal}>
      <form onSubmit={createTaskHandler} className="w-[550px] flex flex-col items-start">

        <input 
          name="title" 
          id="title" 
          type="text" 
          placeholder="Title" 
          className="text-2xl" 
          onChange={(e) => setTitle(e.currentTarget.value)} 
          required 
        />
        
        <input 
          name="description" 
          id="description" 
          type="text" 
          placeholder="Description" 
          className="text-sm"
          required 
        />

        <div className="mt-3 grid grid-cols-3 gap-4">
          <input 
            name="deadline" 
            id="deadline" 
            type="datetime-local" 
            value={deadline} 
            className="text-sm rounded-lg border-2 shadow cursor-pointer"
            onChange={(e) => setDeadline(e.target.value)} 
            required 
          />
          
          <select name="status" id="status" className="text-sm rounded-lg border-2 shadow cursor-pointer">
            {statusesData?.statusSegments.map((status: string) => (
              <option value={status} key={status}>{capitalize(status)}</option>
            ))}
          </select>
        </div>

        <div className="mt-3 pt-3 flex gap-3 justify-end border-t w-full">
          <Button onClick={() => setTaskModal(false)} type="button">Cancel</Button>
          <Button variant={"secondary"} type="submit">Add Task</Button>
        </div>
      </form>
    </Modal>
  );
}
