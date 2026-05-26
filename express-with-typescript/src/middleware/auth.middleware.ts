import type { NextFunction, Request, Response } from "express";
import { authService } from "../modules/auth/auth.service";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../db";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // __________ 1. if client's doesn't has token in header
    const token = req.headers.authorization; // --> get auth token
    if (!token) {
      res.status(401).json({
        success: false,
        message: "Unauthorized user!",
      });
    }

    // __________ 2. verify the token
    const decode = jwt.verify(
      token as string,
      config.secret as string,
    ) as JwtPayload;
    // console.log(decode);

    /* 
- output of decode
{
  id: 4,
  name: 'arwa',
  is_active: true,
  email: 'arwa@example.com',
  iat: 1779720119,
  exp: 1779806519
}
*/

    // __________ 3. find the user into DB or not?
    const userData = await pool.query(
      `
    SELECT * FROM users WHERE email = $1
    `,
      [decode.email],
    );
    const user = userData.rows[0];
    // console.log(user);

    if (userData.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    // __________ 4. if user active or not?
    if (!user.is_active) {
      res.status(403).json({
        success: false,
        message: "Forbidden!",
      });
    }

    // __________ 5. Role based auth (RBAC)

    // console.log("Auth Role: ", user.role) // admin / user ...

    const userRoleList = ["admin", "moderator"];
    if (!userRoleList.includes(user.role)) {
      res.status(403).json({
        success: false,
        message: "This profile is not allowed for access all users",
      });
    }

    req.user = decode; // req: { user: {} }

    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;