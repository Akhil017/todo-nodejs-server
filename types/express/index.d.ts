import { User } from "../../src/types";

declare module "express" {
  interface Request {
    user?: User;
  }
}
