import { RequestHandler } from "express";
import createHttpError from "http-errors";
import Board from "../models/board";

export const getBoards: RequestHandler = async (req, res, next) => {
    const userId = req.session.userId;

    try {
        const boards = await Board.find({ userId }).exec();

        res.status(200).json({ boards });
    } catch (err) {
        next(err);
    }
};

interface BoardTypes {
    title?: string;
}

export const createBoard: RequestHandler<
    unknown,
    unknown,
    BoardTypes,
    unknown
> = async (req, res, next) => {
    const title = req.body.title;
    const userId = req.session.userId;

    try {
        if (!title) {
            throw createHttpError(400, "Title is missing!");
        }

        const board = await Board.create({ title, userId });

        res.status(201).json({ message: "Board created successfully!", board });
    } catch (err) {
        next(err);
    }
};

export const editBoard: RequestHandler<
    { boardId: string },
    unknown,
    BoardTypes,
    unknown
> = async (req, res, next) => {
    const { boardId } = req.params;
    const newTitle = req.body.title;
    const userId = req.session.userId;

    try {
        // if (!userId) {}

        if (!boardId) {
            throw createHttpError(404, "Invalid board id or its not found!");
        }

        if (!newTitle) {
            throw createHttpError(400, "Title should not be empty");
        }

        const existingBoard = await Board.findById(boardId).exec();

        if (!existingBoard) {
            throw createHttpError(404, "Board not found!");
        }

        existingBoard.title = newTitle;

        const updatedBoard = await existingBoard.save();
        res.status(200).json(updatedBoard);
    } catch (err) {
        next(err);
    }
};

export const deleteBoard: RequestHandler<
    { boardId: string },
    unknown,
    unknown,
    unknown
> = async (req, res, next) => {
    const { boardId } = req.params;

    try {
        if (!boardId) {
            throw createHttpError(404, "Invalid board id or its not found!");
        }

        const existingBoard = await Board.findById(boardId).exec();

        if (!existingBoard) {
            throw createHttpError(404, "Board is not found");
        }

        await Board.deleteOne({ _id: boardId });
        res.status(200).json({ message: "Board deleted successfully!" });
    } catch (err) {
        next(err);
    }
};
