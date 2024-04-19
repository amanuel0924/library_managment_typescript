"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const DB_connection_1 = __importDefault(require("./config/DB_connection"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const errorMidleware_1 = require("./middleware/errorMidleware");
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
dotenv_1.default.config();
(0, DB_connection_1.default)();
const PORT = Number(process.env.PORT) || 9000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use('/api/auth', authRoute_1.default);
app.use('/api/user', userRoute_1.default);
app.use(errorMidleware_1.notFound);
app.use(errorMidleware_1.errorHandler);
app.listen(PORT, () => {
    console.log('server is runing on port', PORT);
});
