import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodos,
  updateTodo,
} from "../controllers/todoController.js";

export const router = express.Router();

router.route("/").get(getTodos).post(createTodo);
router.route("/:id").get(getTodo).delete(deleteTodo).put(updateTodo);
