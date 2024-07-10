import { FC, useState, useEffect } from "react";
import { useGetStatusesQuery, usePostTaskMutation } from "@services/tasksApi";
import { capitalize } from "@lib/capitalize";
import { parseTimeFromTitle } from "@lib/parseTimeFromTitle";
import Modal from "@components/Modal";
import styles from "./AddTaskModal.module.css";

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
      <form onSubmit={createTaskHandler} className={styles["form"]}>

        <input 
          name="title" 
          id="title" 
          type="text" 
          placeholder="Title" 
          className={styles["title-input"]} 
          onChange={(e) => setTitle(e.currentTarget.value)} 
          required 
        />
        
        <input 
          name="description" 
          id="description" 
          type="text" 
          placeholder="Description" 
          className={styles["description-input"]} 
          required 
        />

        <div className={styles["add-props"]}>
          <input 
            name="deadline" 
            id="deadline" 
            type="datetime-local" 
            value={deadline} 
            className={styles["date-input"]} 
            onChange={(e) => setDeadline(e.target.value)} 
            required 
          />
          
          <select name="status" id="status" className={styles["status-select"]}>
            {statusesData?.statusSegments.map((status: string) => (
              <option value={status} key={status}>{capitalize(status)}</option>
            ))}
          </select>
        </div>

        <div className={styles["button-wrap"]}>
          <button onClick={() => setTaskModal(false)} className={styles["cancel-button"]} type="button">Cancel</button>
          <button className={styles["button"]} type="submit">Add Task</button>
        </div>
      </form>
    </Modal>
  );
}
