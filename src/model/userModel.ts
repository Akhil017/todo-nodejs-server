import { model, Schema } from "mongoose";
import { User } from "../types";

const userSchema: Schema = new Schema(
  {
    userid: {
      type: String,
      required: [true, "User id is required"],
    },
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = model<User>("User", userSchema);
