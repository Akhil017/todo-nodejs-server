import express, { Request, Response } from "express";
const PORT = 7777;
const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("hello there");
});

app.listen(PORT, () => `server running at ${PORT}`);
