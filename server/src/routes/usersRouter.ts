import express from "express";
import * as usersController from "../controllers/usersController";
import { requiresAuth } from "../middlewares/auth";

const router = express.Router();

router.get("/", requiresAuth, usersController.getAuthUser);
router.post("/signup", usersController.signup);
router.post("/signin", usersController.signin);
router.post("/signout", usersController.signout);

export default router;
