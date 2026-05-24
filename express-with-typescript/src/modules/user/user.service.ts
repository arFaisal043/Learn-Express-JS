import { pool } from "../../db";
import type { IUser } from "./user.interface";
import bcrypt from "bcryptjs";

const createUserIntoDB = async (payload: IUser) => {
  const { name, email, password, age } = payload;

  const hashPassword = await bcrypt.hash(password, 10); // hashing password
  // console.log(hashPassword);

  // insert into users table
  const result = await pool.query(
    `
        INSERT INTO users(name, email, password, age)
        VALUES($1, $2, $3, $4) 
        RETURNING *
    `,
    [name, email, hashPassword, age],
  );
  delete result.rows[0].password;  // show all columns except password

  return result;
};

const getAllUserIntoDB = async (payload: IUser) => {
  const result = await pool.query(`
      SELECT * FROM users;
    `);

  delete result.rows[0].password;
  return result;
};

const getUserIntoDB = async (payload: string) => {
  const id = payload;
  const result = await pool.query(
    `
      SELECT * FROM users WHERE id = $1;
    `,
    [id],
  );
  delete result.rows[0].password;
  return result;
};

const updateUserIntoDB = async (payload: IUser, id: string) => {
  const { name, email, password, is_active } = payload;

  const updateHashPass = await bcrypt.hash(password, 10);
  const result = await pool.query(
    `
      UPDATE users
      SET name=$1, email=$2, password=$3, is_active=$4
      WHERE id=$5 
      RETURNING *
      `,
    [name, email, updateHashPass, is_active, id],
  );
  delete result.rows[0].password;
  return result;
};

const deleteUserIntoDB = async (payload: string) => {
  const id  = payload;
  const result = await pool.query(`
      DELETE FROM users
      WHERE id = $1
    `, [id]);

  return result;
};

export const userService = {
  createUserIntoDB,
  getAllUserIntoDB,
  getUserIntoDB,
  updateUserIntoDB,
  deleteUserIntoDB,
};
