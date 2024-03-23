"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const db_1 = require("./config/db");
const todoRoutes_1 = __importDefault(require("./routes/todoRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 7777;
(0, db_1.connectToDB)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
//routes
app.use("/api/v1/todo", todoRoutes_1.default);
app.use("/api/v1/auth", authRoutes_1.default);
app.get("/", (_, res) => {
    res.send("hello there");
});
app.use(errorMiddleware_1.errorHandler);
app.listen(PORT, () => `server running on port ${PORT}`);
