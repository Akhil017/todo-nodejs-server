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
const todoModel_js_1 = require("../model/todoModel.js");
const userModel_js_1 = require("../model/userModel.js");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
exports.getTodo = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const user = yield userModel_js_1.UserModel.findById((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id);
    if (!user) {
        res.status(401);
        throw new Error("User not found");
    }
    const todo = yield todoModel_js_1.TodoModel.findById(req.params.id);
    if (!todo) {
        res.status(404);
        throw new Error("Ticket not found");
    }
    if (todo.user.toString() !== ((_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.id)) {
        res.status(401);
        throw new Error("Not Authorized");
    }
    res.status(200).json(todo);
}));
exports.createTodo = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    console.log("inside create todo");
    console.log({ user_is: req.user });
    const user = yield userModel_js_1.UserModel.findById((_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c._id);
    if (!user) {
        res.status(401);
        throw new Error("User not found");
    }
    console.log({ user_found_user: user });
    const { todo, priority } = req.body;
    if (!todo || !priority) {
        res.status(400);
        throw new Error("Please add a todo and priority");
    }
    const createdTodo = yield todoModel_js_1.TodoModel.create({
        user: (_d = req.user) === null || _d === void 0 ? void 0 : _d._id,
        todo,
        priority,
        status: "todo",
    });
    res.status(201).json(createdTodo);
}));
exports.deleteTodo = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f;
    const user = yield userModel_js_1.UserModel.findById((_e = req === null || req === void 0 ? void 0 : req.user) === null || _e === void 0 ? void 0 : _e.id);
    if (!user) {
        res.status(401);
        throw new Error("User not found");
    }
    const todo = yield todoModel_js_1.TodoModel.findById(req.params.id);
    if (!todo) {
        res.status(404);
        throw new Error("Todo not found");
    }
    if (todo.user.toString() !== ((_f = req === null || req === void 0 ? void 0 : req.user) === null || _f === void 0 ? void 0 : _f.id)) {
        res.status(401);
        throw new Error("Not Authorized");
    }
    yield todoModel_js_1.TodoModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, _id: req.params.id });
}));
exports.updateTodo = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h;
    const user = yield userModel_js_1.UserModel.findById((_g = req === null || req === void 0 ? void 0 : req.user) === null || _g === void 0 ? void 0 : _g.id);
    if (!user) {
        res.status(401);
        throw new Error("User not found");
    }
    const todo = yield todoModel_js_1.TodoModel.findById(req.params.id);
    if (!todo) {
        res.status(400);
        throw new Error("Please add a todo and priority");
    }
    if (todo.user.toString() !== ((_h = req === null || req === void 0 ? void 0 : req.user) === null || _h === void 0 ? void 0 : _h.id)) {
        res.status(401);
        throw new Error("Not Authorized");
    }
    const updatedTodo = yield todoModel_js_1.TodoModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedTodo);
}));
exports.getTodos = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _j, _k;
    const user = yield userModel_js_1.UserModel.findById((_j = req === null || req === void 0 ? void 0 : req.user) === null || _j === void 0 ? void 0 : _j.id);
    if (!user) {
        res.status(401);
        throw new Error("User not found");
    }
    const todos = yield todoModel_js_1.TodoModel.find({ user: (_k = req === null || req === void 0 ? void 0 : req.user) === null || _k === void 0 ? void 0 : _k.id });
    res.status(200).json(todos);
}));
