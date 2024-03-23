import { InitialStateProps, ActionProps } from "../types/taskReducer";

export const initialState = {
    tasks: [],
};

export const taskReducer = (state: InitialStateProps, action: ActionProps) => {
    switch(action.type) {
        case "Add": return { ...state, tasks: [...state.tasks, action.payload] };
        case "Delete": {
            const filtered = state.tasks.filter(task => task.id !== action.payload);
            return { ...state, tasks: filtered };
        }
        default: return state;
    }
}
