import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { errorHandler } from "./middleware/errorMiddleware.js";
import { connectToDB } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 7777;

connectToDB();

const app = express();

//routes
app.use("/api/v1/todo", require("./routes/todoRoutes"));

app.get("/", (req: Request, res: Response) => {
  res.send("hello there");
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(errorHandler);
app.listen(PORT, () => `server running on port ${PORT}`);
