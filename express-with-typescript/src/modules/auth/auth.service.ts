import bcrypt from "bcryptjs";
import { pool } from "../../db";
import type { IAuthUser } from "./auth.interface";
import jwt, { type JwtPayload } from "jsonwebtoken";
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

  const user = userData.rows[0]; // --> user info

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
    role: user.role
  };

  const accessToken = jwt.sign(jwtPayload, config.secret as string, {
    expiresIn: "1d",
  });

  const refreshToken = jwt.sign(jwtPayload, config.refresh_secret as string, {
    expiresIn: "100d",
  });

  return { accessToken, refreshToken };
};




const generateRefreshToken = async (token: string) => {

  // __________ 1. if client's doesn't has refresh token in cookies
  if (!token) {
    throw new Error("Unauthorized user!");
  }

  // __________ 2. verify the token
  const decode = jwt.verify(
    token as string,
    config.refresh_secret as string,
  ) as JwtPayload;


  // __________ 3. find the user into DB or not?
  const userData = await pool.query(
    `
    SELECT * FROM users WHERE email = $1
    `,
    [decode.email],
  );
  const user = userData.rows[0];

  if (userData.rows.length === 0) {
    throw new Error("User not found!");
  }

  // __________ 4. if user active or not?
  if (!user.is_active) {
    throw new Error("Forbidden!");
  }

  const jwtPayload = {
    id: user.id,
    name: user.name,
    is_active: user.is_active,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.secret as string, {
    expiresIn: "1d",
  });
};



export const authService = {
  loginUserIntoDB,
  generateRefreshToken,
};
