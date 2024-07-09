import { FC, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { TbLayoutSidebar, TbCalendar, TbCalendarWeek } from "react-icons/tb";
import { useGetStatusesQuery, usePostTaskMutation } from "../services/tasksApi";
import Modal from "./Modal";

// ToDo - Validation
// ToDo - Reset inputs
interface ISidebar {
  sidebarState: boolean;
  setSidebarState: (state: boolean) => void;
}

export const Sidebar: FC<ISidebar> = ({ sidebarState, setSidebarState }) => {
  const [taskModal, setTaskModal] = useState(false);
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const { data: statusesData } = useGetStatusesQuery(undefined);
  const [postTask, { data }] = usePostTaskMutation();
  console.log(data)
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
    // event.currentTarget.reset();
  };

  return (
    <>
      <aside className={`${sidebarState ? "p-6 w-[300px]" : "w-0"} bg-amber-50 min-h-screen flex flex-col shadow-lg duration-500`}>
        {sidebarState && (
          <>
            <section className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium">To Do App</h3>
              <button onClick={() => setSidebarState(false)}>
                <TbLayoutSidebar className="text-gray-500 w-6 h-6" />
              </button>
            </section>



            <section className="flex flex-col items-start gap-2">
              <NavLink to={"/dashboard"} className="text-gray-400 hover:text-gray-700 py-2 w-full flex items-center gap-3 cursor-pointer duration-300">
                <TbCalendar className="w-6 h-6" />
                <p>Today</p>
              </NavLink>
              
              <NavLink to={"/dashboard/upcoming"} className="text-gray-400 hover:text-gray-700 py-2 w-full flex items-center gap-3 cursor-pointer duration-300">
                <TbCalendarWeek className="w-6 h-6" />
                <p>Upcoming</p>
              </NavLink>

              <button onClick={() => setTaskModal(true)} className="text-base font-normal py-1 w-full bg-slate-200 rounded-xl">
                + Add Task
              </button>

              <h5 className="text-gray-700 text-sm font-normal">Projects</h5>
              <button className="text-base font-normal py-1 w-full bg-slate-200 rounded-xl">
                + Create Project
              </button>
            </section>



            {/* ToDo - Create toggle for switching between light and dark themes */}
            <section className="mt-auto">
              Theme Toggle
            </section>
          </>
        )}
      </aside>
      {taskModal && (
        <Modal state={taskModal} setState={setTaskModal}>
          <h3 className="text-xl mb-5">Add Task Form</h3>
          <form onSubmit={createTaskHandler}>
            <input name="title" id="title" type="text" placeholder="Title" onChange={(e) => setTitle(e.currentTarget.value)} required />
            <input name="description" id="description" type="text" placeholder="description" required />
            <input name="deadline" id="deadline" type="datetime-local" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
            <select name="status" id="status">
              {statusesData?.statusSegments.map((status: string) => (
                <option value={status} key={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
              ))}
            </select>
            <button className="text-white text-base font-semibold py-2 px-4 bg-purple-700 hover:bg-purple-500 rounded-lg duration-300" type="submit">
              + Add Task
            </button>
          </form>
        </Modal>
      )}
    </>
  );
}

const parseTimeFromTitle = (title: string) => {
  const timePattern = /at\s(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i;
  const match = title.match(timePattern);

  if (match) {
    let hour = parseInt(match[1]);
    const minute = match[2] ? parseInt(match[2], 10) : 0;
    const period = match[3]?.toLowerCase(); 

    if (period === "pm" && hour < 12) {
      hour += 12;
    } else if (period === "am" && hour === 12) {
      hour = 0;
    }

    const date = new Date();
    date.setHours(hour, minute, 0, 0);

    const timezoneOffset = date.getTimezoneOffset() * 60000;
    const localTime = new Date(date.getTime() - timezoneOffset);
    return localTime.toISOString().slice(0, 16);
  }
  return "";
};
