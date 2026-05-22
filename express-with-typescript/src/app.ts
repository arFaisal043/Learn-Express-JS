import dotenv from "dotenv";
import express, {
  response,
  type Application,
  type Request,
  type Response,
} from "express";
import { initDB, pool } from "./db";
import { userRoute } from "./modules/user/user.route";

const app: Application = express();



app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "This is root routes",
    author: "AR Faisal",
  });
});



// ________ prefix -> pre-require for get into /users api ______________________

app.use("/api/users", userRoute);

// ________ Built in Middleware for POST method _______________________

app.use(express.json()); // for req json data
app.use(express.text()); // for req text data
app.use(express.urlencoded()); // for req text data



export default app;