import bcrypt from "bcryptjs";
import { pool } from "../../db";
import type { IAuthUser } from "./auth.interface";
import jwt from "jsonwebtoken";
import config from "../../config";

const loginUserIntoDB = async (payload: IAuthUser) => {
  const { email, password } = payload;

  // step 1: check if the user is exist or not?
  // step 2: compare the password
  // step 3: generate token

  const userData = await pool.query(
    `
    SELECT * FROM users WHERE email = $1
    `,
    [email],
  );

  // __________ step 1: check if the user is exist or not? __________________________

  if (userData.rows.length === 0) {
    throw new Error("Invalid Credentials!");
  }

  const user = userData.rows[0];

  // ___________ step 2: compare the password __________________________

  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    throw new Error("Password doesn't match!");
  }

  // ___________ step 3: generate token __________________________
  
  const jwtPayload = {
    id: user.id,
    name: user.name,
    is_active: user.is_active,
    email: user.email,
  };

  const accessToken = jwt.sign(jwtPayload, config.secret as string, {
    expiresIn: "1d",
  });

  return { accessToken };
};

export const authService = {
  loginUserIntoDB,
};
