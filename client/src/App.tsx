import { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import { TaskProps } from "./types/Task";
import { initialState, taskReducer } from "./reducers/taskReducer";

function App() {
    const [state, dispatch] = useReducer(taskReducer, initialState);

    const handleAddTask = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = Object.fromEntries(new FormData(form).entries());
        const newTask = {...data, id: uuidv4()} as TaskProps;

        dispatch({ type: "Add", payload: newTask })
        form.reset();
    }

    const handleDelete = (id: string) => {
        dispatch({ type: "Delete", payload: id });
    }

    return (
        <>
            <form onSubmit={handleAddTask}>
                <input name="title" type="text" placeholder="title"/>
                <input name="description" type="text" placeholder="description"/>
                <button type="submit">+Add Task</button>
            </form>

            <div>
                {state.tasks.length > 0 
                ? (
                    state.tasks.map((task, index) => (
                        <div key={task.id}>
                            <p>{index + 1}.{task.title}</p>
                            <button onClick={() => handleDelete(task.id)}>Delete</button>
                        </div>
                    ))
                ) 
                : (<div>No tasks to display</div>)}
            </div>
        </>
    );
}

export default App;
