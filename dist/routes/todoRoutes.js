"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const todoController_js_1 = require("../controllers/todoController.js");
exports.router = express_1.default.Router();
exports.router.route("/").get(todoController_js_1.getTodos).post(todoController_js_1.createTodo);
exports.router.route("/:id").get(todoController_js_1.getTodo).delete(todoController_js_1.deleteTodo).put(todoController_js_1.updateTodo);
