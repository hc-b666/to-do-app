import { Schema, InferSchemaType, model } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        select: false,
        required: true,
    },
    password: {
        type: String,
        select: false,
        required: true,
    },
});

type User = InferSchemaType<typeof UserSchema>;

export default model<User>("User", UserSchema);
