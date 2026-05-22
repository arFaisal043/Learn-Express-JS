import type { Request, Response } from "express";
import { pool } from "../../db";
import { userService } from "./user.service";


const createUser = async (req: Request, res: Response) => {
  //   const { name, email, password, age } = req.body;
  try {
    const result = await userService.createUserIntoDB(req.body);
    // console.log(result.rows[0]);

    res.status(200).json({
      message: "User is created",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};



const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUserIntoDB();
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully!",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};



const getUser = async (req: Request, res: Response) => {
  try {
    const {id}  = req.params;

    const result = await userService.getUserIntoDB(id as string);
    res.status(200).json({
      success: true,
      message: "User retrieved successfully!",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};



const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // const { name, email, password, is_active } = req.body;

    const result = await userService.updateUserIntoDB(req.body, id as string);
    res.status(200).json({
      success: true,
      message: "User updated successfully!",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};



const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await userService.deleteUserIntoDB(id as string);
    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};



export const userController = {
  createUser,
  getAllUser,
  getUser,
  updateUser,
  deleteUser
};
