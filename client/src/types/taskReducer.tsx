import { TaskProps } from "./Task";

export type InitialStateProps = {
    tasks: TaskProps[];
}

type AddProps = {
    type: "Add";
    payload: TaskProps;
}

type DeleteProps = {
    type: "Delete";
    payload: string;
}

export type ActionProps = AddProps | DeleteProps;
