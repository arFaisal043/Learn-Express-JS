import { Router, type NextFunction, type Request, type Response } from "express";
import { pool } from "../../db";
import { userController } from "./user.controller";
import authMiddleware from "../../middleware/auth.middleware";

const router = Router();


router.post("/", userController.createUser);

router.get("/", authMiddleware, userController.getAllUser);

router.get("/:id", userController.getUser);

router.put("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);


export const userRoute = router;