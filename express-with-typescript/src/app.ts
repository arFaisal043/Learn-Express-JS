import dotenv from "dotenv";
import express, {
  response,
  type Application,
  type NextFunction,
  type Request,
  type RequestHandler,
  type Response,
} from "express";
import { initDB, pool } from "./db";
import { userRoute } from "./modules/user/user.route";
import { profileRoute } from "./modules/profile/profile.route";
import { authRoute } from "./modules/auth/auth.route";
import logMiddleware from "./middleware/logger.middleware";
import CookieParser from "cookie-parser";
import cors from "cors";
import { globalErrorHandler } from "./middleware/globalErrorHandler";



const app: Application = express();


// ________ Built in Middleware for POST method _______________________

app.use(express.json()); // for req json data
app.use(express.text()); // for req text data
app.use(express.urlencoded({ extended: true })); 

app.use(CookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200, 
  }),
);

// ________ custom log middleware ____________________________

app.use(logMiddleware);




// root routes
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "This is root routes",
    author: "AR Faisal",
  });
});




// ________ prefix -> pre-require for get into /users and /profile api ______________________

app.use("/api/users", userRoute);

app.use("/api/profile", profileRoute);

// prefix for auth route
app.use("/api/auth", authRoute);





// _________ Global Error Handler ______________________

app.use(globalErrorHandler);


export default app;