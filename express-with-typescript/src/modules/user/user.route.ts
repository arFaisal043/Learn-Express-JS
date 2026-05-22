import { Router, type Request, type Response } from "express";
import { pool } from "../../db";
import { userController } from "./user.controller";


const router = Router();

// _________  post method for insert value into users table _______________________

router.post("/", userController.createUser);


// ________ get all users from users table _______________________

router.get("/", userController.getAllUser);



// ________ get an user from users table _______________________

router.get("/:id", userController.getUser);



// __________ Update an user _______________________

router.put("/:id", userController.updateUser);



// __________ Delete an user _______________________

router.delete("/:id", userController.deleteUser);



export const userRoute = router;