import { pool } from "../../db";
import type { IUser } from "./user.interface";

const createUserIntoDB = async (payload: IUser) => {
  const { name, email, password, age } = payload;

  // insert into users table
  const result = await pool.query(
    `
        INSERT INTO users(name, email, password, age)
        VALUES($1, $2, $3, $4) 
        RETURNING *
    `,
    [name, email, password, age],
  );

  return result;
};

const getAllUserIntoDB = async (payload: IUser) => {
  const result = await pool.query(`
      SELECT * FROM users;
    `);

  return result;
};

const getUserIntoDB = async (payload: string) => {
  const id = payload;
  const result = await pool.query(`
      SELECT id, name, email, age FROM users WHERE id = ${id};
    `);

  return result;
};

const updateUserIntoDB = async (payload: IUser, id: string) => {
  const { name, email, password, is_active } = payload;

  const result = await pool.query(
    `
      UPDATE users
      SET name=$1, email=$2, password=$3, is_active=$4
      WHERE id=$5 
      RETURNING *
      `,
    [name, email, password, is_active, id],
  );

  return result;
};

const deleteUserIntoDB = async (payload: string) => {
  const id  = payload;
  const result = await pool.query(`
      DELETE FROM users
      WHERE id = ${id}
    `);

  return result;
};

export const userService = {
  createUserIntoDB,
  getAllUserIntoDB,
  getUserIntoDB,
  updateUserIntoDB,
  deleteUserIntoDB,
};
