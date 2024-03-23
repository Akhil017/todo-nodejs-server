import { TodoModel } from "../model/todoModel.js";
import { UserModel } from "../model/userModel.js";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

export const getTodo = asyncHandler(async (req: Request, res: Response) => {
  const user = await UserModel.findById(req?.user?.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const todo = await TodoModel.findById(req.params.id);

  if (!todo) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (todo.user.toString() !== req?.user?.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  res.status(200).json(todo);
});

export const createTodo = asyncHandler(async (req: Request, res: Response) => {
  console.log("inside create todo");
  console.log({ user_is: req.user });

  const user = await UserModel.findById(req?.user?._id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  console.log({ user_found_user: user });

  const { todo, priority } = req.body;

  if (!todo || !priority) {
    res.status(400);
    throw new Error("Please add a todo and priority");
  }

  const createdTodo = await TodoModel.create({
    user: req.user?._id,
    todo,
    priority,
    status: "todo",
  });

  res.status(201).json(createdTodo);
});

export const deleteTodo = asyncHandler(async (req: Request, res: Response) => {
  const user = await UserModel.findById(req?.user?.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const todo = await TodoModel.findById(req.params.id);

  if (!todo) {
    res.status(404);
    throw new Error("Todo not found");
  }

  if (todo.user.toString() !== req?.user?.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  await TodoModel.findByIdAndDelete(req.params.id);

  res.status(200).json({ success: true, _id: req.params.id });
});

export const updateTodo = asyncHandler(async (req: Request, res: Response) => {
  const user = await UserModel.findById(req?.user?.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const todo = await TodoModel.findById(req.params.id);

  if (!todo) {
    res.status(400);
    throw new Error("Please add a todo and priority");
  }

  if (todo.user.toString() !== req?.user?.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  const updatedTodo = await TodoModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedTodo);
});

export const getTodos = asyncHandler(async (req: Request, res: Response) => {
  const user = await UserModel.findById(req?.user?.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const todos = await TodoModel.find({ user: req?.user?.id });
  res.status(200).json(todos);
});
