import { TodoModel } from "../model/todo.js";
import { Todo } from "../types.js";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

export const getTodo = asyncHandler(async (req: Request, res: Response) => {
  const todo = await TodoModel.findById(req.params.id);

  if (!todo) {
    res.status(404);
    throw new Error("Todo not found");
  }

  res.status(200).json;
});

export const createTodo = asyncHandler(async (req: Request, res: Response) => {
  console.log({ body: req.body });
  const { todo, priority } = req.body;

  if (!todo || !priority) {
    res.status(400);
    throw new Error("Please add a todo and priority");
  }

  const createdTodo = await TodoModel.create({
    todo,
    priority,
    status: "todo",
  });

  res.status(201).json(createdTodo);
});

export const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await TodoModel.findById(req.params.id);
  if (!todo) {
    res.status(404);
    throw new Error("Todo not found");
  }
  await TodoModel.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true });
});

export const updateTodo = asyncHandler(async (req, res) => {
  const todo = await TodoModel.findById(req.params.id);
  if (!todo) {
    res.status(400);
    throw new Error("Please add a todo and priority");
  }
  const updatedTodo = await TodoModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedTodo);
});

export const getTodos = asyncHandler(async (req: Request, res: Response) => {
  const todos: Todo[] = await TodoModel.find();
  res.status(200).json(todos);
});
