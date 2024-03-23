import { Todo } from "../types.js";
import { model, Schema } from "mongoose";

const todoSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
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

export const TodoModel = model<Todo>("Todo", todoSchema);
