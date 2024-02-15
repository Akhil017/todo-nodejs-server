import { Document } from "mongoose";

export interface Todo extends Document {
  todo: string;
  status: string;
  priority: string;
}
