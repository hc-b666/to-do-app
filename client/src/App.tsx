import { useRef, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import { TaskProps } from "./types/Task";
import { initialState, taskReducer } from "./reducers/taskReducer";
import TaskCard from "./components/TaskCard/TaskCard";

function App() {
    const titleRef = useRef<HTMLInputElement>(null);
    const [state, dispatch] = useReducer(taskReducer, initialState);

    const handleAddTask = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Validation
        if (titleRef.current?.value.trim() === "") {
            return  alert("Task title should not be empty!");
        }
        // Adding it to tasks state
        const taskTitle = titleRef.current?.value;
        const newTask = {title: taskTitle, isCompleted: false, id: uuidv4()} as TaskProps;
        dispatch({ type: "Add", payload: newTask })
        event.currentTarget.reset();
    }

    const handleDelete = (id: string) => {
        dispatch({ type: "Delete", payload: id });
    }

    return (
        <main>
            <form onSubmit={handleAddTask}>
                <input ref={titleRef} type="text" placeholder="Enter title..."/>
                <button type="submit">+Add Task</button>
            </form>

            <div className="tasks-container">
                {state.tasks.length > 0 
                ? (
                    state.tasks.map((task: TaskProps) => (
                        <TaskCard task={task} handleDelete={handleDelete} key={task.id}/>
                    ))
                ) 
                : (<div>No tasks to display</div>)}
            </div>
        </main>
    );
}

export default App;
