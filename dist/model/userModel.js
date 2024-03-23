"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
});
exports.UserModel = (0, mongoose_1.model)("User", userSchema);
