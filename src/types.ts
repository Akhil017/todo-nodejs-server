import { Document } from "mongoose";

export interface Todo extends Document {
  user: User;
  todo: string;
  status: string;
  priority: string;
}

export interface User extends Document {
  userid: string;
  name: string;
  email: string;
}
