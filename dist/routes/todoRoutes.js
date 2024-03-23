"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todoController_js_1 = require("../controllers/todoController.js");
const authMiddleWare_js_1 = require("../middleware/authMiddleWare.js");
const router = express_1.default.Router();
router.route("/").get(authMiddleWare_js_1.protect, todoController_js_1.getTodos).post(authMiddleWare_js_1.protect, todoController_js_1.createTodo);
router
    .route("/:id")
    .get(authMiddleWare_js_1.protect, todoController_js_1.getTodo)
    .delete(authMiddleWare_js_1.protect, todoController_js_1.deleteTodo)
    .put(authMiddleWare_js_1.protect, todoController_js_1.updateTodo);
exports.default = router;
