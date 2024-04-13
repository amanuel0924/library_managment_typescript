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
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = __importDefault(require("../models/userModel"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    try {
        const hashedPassword = yield bcrypt_1.default.hash(user.password, 10);
        const newUser = yield userModel_1.default.create(Object.assign(Object.assign({}, user), { password: hashedPassword }));
        return res.status(201).json({ message: "success",
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            } });
    }
    catch (error) {
        res.status(400);
        next(error);
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield userModel_1.default.findOne({ email });
        if (!user) {
            res.status(400);
            throw new Error("Invalid email or password");
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(400);
            throw new Error("Invalid email or password");
        }
        if (user) {
            (0, generateToken_1.default)(res, user._id);
            return res.status(200).json({ message: "success",
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                } });
        }
    }
    catch (error) {
        res.status(400);
        next(error);
    }
});
exports.login = login;
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    token = req.cookies.jwt;
    let secrete = process.env.JWT_SECRET || "";
    if (token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, secrete);
            const user = yield userModel_1.default.findById(decoded.id);
            req.user = user;
            next();
        }
        catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }
    if (!token) {
        res.status(401);
        throw new Error("you are not logged in");
    }
});
