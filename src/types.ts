import { Document } from "mongoose";

export interface Todo extends Document {
  todo: string;
  status: string;
  priority: string;
}

export interface User extends Document {
  userid: string;
  name: string;
  email: string;
}
