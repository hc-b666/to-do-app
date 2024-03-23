import { useState } from "react";
import { TaskProps } from "../../types/Task";
import "./taskCard.css";

type TaskCardProps = {
    task: TaskProps;
    handleDelete: (id: string) => void;
}

function TaskCard({ task, handleDelete }: TaskCardProps) {
    const { title, id, isCompleted } = task;
    const [check, setCheck] = useState(isCompleted);
    return (
        <div className="task-card flex">
            <div className="flex">
                <input checked={check} onChange={() => setCheck(!check)} type="checkbox" />
                <p className={check ? "checked" : ""}>{title}</p>
            </div>
            <button onClick={() => handleDelete(id)}>Delete</button>
        </div>
    );
}

export default TaskCard;
