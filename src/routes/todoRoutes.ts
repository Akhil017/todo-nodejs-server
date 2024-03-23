import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodos,
  updateTodo,
} from "../controllers/todoController.js";
import { protect } from "../middleware/authMiddleWare.js";

const router = express.Router();

router.route("/").get(protect, getTodos).post(protect, createTodo);
router
  .route("/:id")
  .get(protect, getTodo)
  .delete(protect, deleteTodo)
  .put(protect, updateTodo);

export default router;
