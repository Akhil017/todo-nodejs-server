import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { UserModel } from "../model/userModel";
import { NextFunction, Request, Response } from "express";
import { User } from "../types";

export const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        // Get token from header
        token = req.headers.authorization.split(" ")[1];
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
          id: string;
        };
        // Get user from token
        req.user = (await UserModel.findById(decoded.id)) as User;
        next();
      } catch (error) {
        console.log(error);
        res.status(401);
        throw new Error("Not authorized");
      }
    }

    if (!token) {
      res.status(401);
      throw new Error("Not authorized");
    }
  }
);
