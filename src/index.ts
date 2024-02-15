import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { errorHandler } from "./middleware/errorMiddleware.js";

const PORT = process.env.PORT || 7777;
const app = express();

//routes
app.use("/api/todo", require("./routes/todoRoutes"));

app.get("/", (req: Request, res: Response) => {
  res.send("hello there");
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(errorHandler);
app.listen(PORT, () => `server running on port ${PORT}`);
