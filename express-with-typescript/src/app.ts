import dotenv from "dotenv";
import express, {
  response,
  type Application,
  type Request,
  type Response,
} from "express";
import { initDB, pool } from "./db";
import { userRoute } from "./modules/user/user.route";
import { profileRoute } from "./modules/profile/profile.route";
import { authRoute } from "./modules/auth/auth.route";

const app: Application = express();



app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "This is root routes",
    author: "AR Faisal",
  });
});




// ________ Built in Middleware for POST method _______________________

app.use(express.json()); // for req json data
app.use(express.text()); // for req text data
app.use(express.urlencoded({ extended: true })); // for req text data




// ________ prefix -> pre-require for get into /users and /profile api ______________________

app.use("/api/users", userRoute);

app.use("/api/profile", profileRoute);

// prefix for auth route
app.use("/api/auth", authRoute);

export default app;