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
exports.getTodos = exports.updateTodo = exports.deleteTodo = exports.createTodo = exports.getTodo = void 0;
const todo_js_1 = require("../model/todo.js");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
exports.getTodo = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todo = yield todo_js_1.TodoModel.findById(req.params.id);
    if (!todo) {
        res.status(404);
        throw new Error("Todo not found");
    }
    res.status(200).json;
}));
exports.createTodo = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { todo, priority } = req.body;
    if (!todo || !priority) {
        res.status(400);
        throw new Error("Please add a todo and priority");
    }
    const createdTodo = yield todo_js_1.TodoModel.create({
        todo,
        priority,
        status: "todo",
    });
    res.status(201).json(createdTodo);
}));
exports.deleteTodo = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todo = yield todo_js_1.TodoModel.findById(req.params.id);
    if (!todo) {
        res.status(404);
        throw new Error("Todo not found");
    }
    yield todo_js_1.TodoModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, _id: req.params.id });
}));
exports.updateTodo = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todo = yield todo_js_1.TodoModel.findById(req.params.id);
    if (!todo) {
        res.status(400);
        throw new Error("Please add a todo and priority");
    }
    const updatedTodo = yield todo_js_1.TodoModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedTodo);
}));
exports.getTodos = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todos = yield todo_js_1.TodoModel.find();
    res.status(200).json(todos);
}));
