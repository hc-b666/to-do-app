import express from "express";
import * as boardsController from "../controllers/boardsController";

const router = express.Router();

router.get("/", boardsController.getBoards);
router.post("/", boardsController.createBoard);
router.put("/:boardId", boardsController.editBoard);
router.delete("/:boardId", boardsController.deleteBoard);

export default router;
