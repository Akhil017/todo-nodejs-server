import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { errorHandler } from "./middleware/errorMiddleware";
import { connectToDB } from "./config/db";
import TodoRouter from "./routes/todoRoutes";
import AuthRouter from "./routes/authRoutes";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 7777;

connectToDB();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use("/api/v1/todo", TodoRouter);
app.use("/api/v1/auth", AuthRouter);

app.get("/", (_: Request, res: Response) => {
  res.send("hello there");
});

app.use(errorHandler);
app.listen(PORT, () => `server running on port ${PORT}`);
