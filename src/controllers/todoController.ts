import { TodoSchema } from "../model/todo.js";
import { Todo } from "../types.js";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

export const getTodos = asyncHandler(async (req: Request, res: Response) => {
  const todos: Todo[] = await TodoSchema.find();
  res.status(200).json(todos);
});

export const createTodo = asyncHandler(async (req: Request, res: Response) => {
  const { todo, priority } = req.body;

  if (!todo || !priority) {
    res.status(400);
    throw new Error("Please add a todo and priority");
  }

  const createdTodo = await TodoSchema.create({
    todo,
    priority,
    status: "todo",
  });

  res.status(201).json(createdTodo);
});

export const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await TodoSchema.findById(req.params.id);
  if (!todo) {
    res.status(404);
    throw new Error("Todo not found");
  }
  await TodoSchema.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true });
});
