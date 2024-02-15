import { Todo } from "../types.js";
import { model, Schema } from "mongoose";

const todoSchema: Schema = new Schema(
  {
    todo: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const TodoSchema = model<Todo>("Todo", todoSchema);
