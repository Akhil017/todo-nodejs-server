"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authGoogleUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const google_auth_library_1 = require("google-auth-library");
const userModel_1 = require("../model/userModel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.authGoogleUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        try {
            // Get token from header
            token = req.headers.authorization.split(" ")[1];
            // Verify token
            const client = new google_auth_library_1.OAuth2Client();
            const ticket = yield client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            const payload = ticket.getPayload();
            let user;
            // check if user exist
            user = yield userModel_1.UserModel.findOne({ userid: payload === null || payload === void 0 ? void 0 : payload.sub });
            // if not create user
            if (user) {
                sendResponse(200, user, res);
            }
            else {
                user = yield userModel_1.UserModel.create({
                    userid: payload === null || payload === void 0 ? void 0 : payload.sub,
                    email: payload === null || payload === void 0 ? void 0 : payload.email,
                    name: payload === null || payload === void 0 ? void 0 : payload.name,
                });
                if (user) {
                    sendResponse(201, user, res);
                }
                else {
                    res.status(400);
                    throw new Error("Invalid user data");
                }
            }
        }
        catch (error) {
            console.log(error);
            res.status(401);
            throw new Error("Not authorized");
        }
    }
    if (!token) {
        res.status(401);
        throw new Error("Not authorized");
    }
}));
// Generate token
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};
const sendResponse = (status, user, res) => {
    res.status(status).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
    });
};
