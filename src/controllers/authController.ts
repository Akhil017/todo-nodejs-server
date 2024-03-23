import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import { UserModel } from "../model/userModel";
import jwt from "jsonwebtoken";
import { User } from "../types";

export const authGoogleUser = asyncHandler(
  async (req: Request, res: Response) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        // Get token from header
        token = req.headers.authorization.split(" ")[1];
        // Verify token
        const client = new OAuth2Client();
        const ticket = await client.verifyIdToken({
          idToken: token,
          audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();

        let user: User | null;
        // check if user exist
        user = await UserModel.findOne({ userid: payload?.sub });
        // if not create user
        if (user) {
          sendResponse(200, user, res);
        } else {
          user = await UserModel.create({
            userid: payload?.sub,
            email: payload?.email,
            name: payload?.name,
          });
          if (user) {
            sendResponse(201, user, res);
          } else {
            res.status(400);
            throw new Error("Invalid user data");
          }
        }
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

// Generate token
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });
};

const sendResponse = (status: number, user: User, res: Response) => {
  res.status(status).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
};
