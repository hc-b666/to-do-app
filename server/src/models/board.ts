import { Schema, InferSchemaType, model } from "mongoose";

const BoardSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

type Board = InferSchemaType<typeof BoardSchema>;

export default model<Board>("Board", BoardSchema);
