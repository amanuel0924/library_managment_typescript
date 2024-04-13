"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DB_connection_1 = __importDefault(require("./config/DB_connection"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const errorMidleware_1 = require("./middleware/errorMidleware");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
(0, DB_connection_1.default)();
const PORT = Number(process.env.PORT) || 9000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/auth', authRoute_1.default);
app.use(errorMidleware_1.notFound);
app.use(errorMidleware_1.errorHandler);
app.listen(PORT, () => {
    console.log('server is runing on port', PORT);
});
