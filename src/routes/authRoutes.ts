import express from "express";
import { authGoogleUser } from "../controllers/authController";

const router = express.Router();

router.post("/google", authGoogleUser);

export default router;
