"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoModel = void 0;
const mongoose_1 = require("mongoose");
const todoSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    todo: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.TodoModel = (0, mongoose_1.model)("Todo", todoSchema);
