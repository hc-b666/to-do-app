import { FC, useState, useEffect } from "react";
import { useGetStatusesQuery, usePostTaskMutation } from "@services/tasksApi";
import { capitalize } from "@lib/capitalize";
import { parseTimeFromTitle } from "@lib/parseTimeFromTitle";
import Modal from "@components/Modal";
import { Button } from "@components/ui/button";
import { useToast } from "@components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";

interface IAddTaskModal {
  taskModal: boolean;
  setTaskModal: (state: boolean) => void;
}

export const AddTaskModal: FC<IAddTaskModal> = ({ taskModal, setTaskModal }) => {
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const { data: statusesData } = useGetStatusesQuery(undefined);
  const [postTask] = usePostTaskMutation();
  const { toast } = useToast();

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

      if (res.error) {
        toast({
          title: "An error occurred while creating the task",
          duration: 5000,
        });
        return;
      }
      
      if (res.data) {
        toast({
          title: "Task created successfully",
          duration: 5000,
        });
        setTaskModal(false);
      }
  
    } catch (error) {
      console.log(error);      
    }
  };

  return (
    <Modal state={taskModal} setState={setTaskModal}>
      <form onSubmit={createTaskHandler} className="w-[550px] flex flex-col items-start bg-white dark:bg-black">

        <input 
          name="title" 
          id="title" 
          type="text" 
          placeholder="Title" 
          className="text-2xl bg-transparent w-full" 
          onChange={(e) => setTitle(e.currentTarget.value)} 
        />
        
        <input 
          name="description" 
          id="description" 
          type="text" 
          placeholder="Description" 
          className="text-sm bg-transparent w-full"
        />

        <div className="mt-3 grid grid-cols-3 gap-4">
          <input 
            name="deadline" 
            id="deadline" 
            type="datetime-local" 
            value={deadline} 
            className="text-sm rounded-lg border-2 shadow cursor-pointer"
            onChange={(e) => setDeadline(e.target.value)} 
          />
          
          <Select name="status" defaultValue={statusesData?.statusSegments[0]}>
            <SelectTrigger>
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {statusesData?.statusSegments.map((status: string) => (
                  <SelectItem value={status} key={status}>{capitalize(status)}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-3 pt-3 flex gap-3 justify-end border-t w-full">
          <Button onClick={() => setTaskModal(false)} type="button">Cancel</Button>
          <Button variant={"secondary"} type="submit">Add Task</Button>
        </div>
      </form>
    </Modal>
  );
}
