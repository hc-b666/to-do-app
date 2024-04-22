import { RequestHandler } from "express";
import createHttpError from "http-errors";
import Task from "../models/task";

export const getTasks: RequestHandler<
    { boardId: string },
    unknown,
    unknown,
    unknown
> = async (req, res, next) => {
    const { boardId } = req.params;

    try {
        const tasks = await Task.find({ boardId: boardId }).exec();

        res.status(200).json(tasks);
    } catch (err) {
        next(err);
    }
};

interface TaskTypes {
    title?: string;
    description?: string;
}

export const createTask: RequestHandler<
    { boardId: string },
    unknown,
    TaskTypes,
    unknown
> = async (req, res, next) => {
    const { boardId } = req.params;
    const title = req.body.title;
    const description = req.body.description;

    try {
        if (!boardId) {
            throw createHttpError(
                404,
                "No board is chosen. choose board to create task"
            );
        }

        if (!title) {
            throw createHttpError(400, "Title of task should not be empty!");
        }

        if (!description) {
            throw createHttpError(
                400,
                "Description of task should not be empty!"
            );
        }

        const task = await Task.create({
            title,
            description,
            status: false,
            boardId,
        });

        res.status(201).json({ message: "Task created successfully!", task });
    } catch (err) {
        next(err);
    }
};

interface UpdateTaskBody {
    title?: string;
    description?: string;
    status?: boolean;
}

export const updateTask: RequestHandler<
    { taskId: string },
    unknown,
    UpdateTaskBody,
    unknown
> = async (req, res, next) => {
    const { taskId } = req.params;
    const { title, description, status } = req.body;

    try {
        const task = await Task.findById(taskId);

        if (!task) {
            throw createHttpError(404, "Task not found");
        }

        if (title) {
            task.title = title;
        }

        if (description) {
            task.description = description;
        }

        if (status) {
            task.status = status;
        }

        await task.save();

        res.status(200).json({ message: "Task updated successfully", task });
    } catch (err) {
        next(err);
    }
};

export const deleteTask: RequestHandler<
    { taskId: string },
    unknown,
    unknown,
    unknown
> = async (req, res, next) => {
    const { taskId } = req.params;

    try {
        if (!taskId) {
            throw createHttpError(404, "Task is not found");
        }

        const existingTask = await Task.findById(taskId).exec();

        if (!existingTask) {
            throw createHttpError(404, "Task is not found!");
        }

        await Task.deleteOne({ _id: taskId });
        res.status(200).json({ message: "Task is deleted successfully" });
    } catch (err) {
        next(err);
    }
};
