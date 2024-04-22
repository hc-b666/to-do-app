import express from "express";
import * as tasksController from "../controllers/tasksController";

const router = express.Router();

router.get("/:boardId", tasksController.getTasks);
router.post("/:boardId", tasksController.createTask);
router.put("/:taskId", tasksController.updateTask);
router.delete("/:taskId", tasksController.deleteTask);

export default router;
