import express from "express";
import { createTodo, getTodos } from "../controllers/todoController";
const router = express.Router();

router.route("/").get(getTodos).post(createTodo);
