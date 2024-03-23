import { TaskProps } from "./Task";

export type InitialStateProps = {
    tasks: TaskProps[];
}

export type ActionProps = {
    type: "Add" | "Delete";
    payload: TaskProps | string;
}
