import { Schema, InferSchemaType, model } from "mongoose";

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
    boardId: {
        type: Schema.Types.ObjectId,
        ref: "Board",
        required: true,
    },
});

type Task = InferSchemaType<typeof TaskSchema>;

export default model<Task>("Task", TaskSchema);
