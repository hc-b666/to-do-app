import { RequestHandler } from "express";
import createHttpError from "http-errors";
import Board from "../models/board";

export const getBoards: RequestHandler = async (req, res, next) => {
    try {
        const boards = await Board.find().exec();

        res.status(200).json({ boards });
    } catch (err) {
        next(err);
    }
};

interface CreateBoardBody {
    title?: string;
}

export const createBoard: RequestHandler<
    unknown,
    unknown,
    CreateBoardBody,
    unknown
> = async (req, res, next) => {
    const title = req.body.title;
    const userId = req.session.userId;

    try {
        if (!title) {
            throw createHttpError(400, "Title is missing!");
        }

        const board = new Board({ title, userId });
        await board.save();

        res.status(201).json({ message: "Board created successfully!"});
    } 
    catch (err) {
        next(err);
    }
};
