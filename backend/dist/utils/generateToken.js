"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (res, id) => {
    const secrete = process.env.JWT_SECRET || "unkown";
    const token = jsonwebtoken_1.default.sign({ id }, secrete, {
        expiresIn: "30d",
    });
    res.cookie("jwt", token, {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
        sameSite: "strict",
    });
};
exports.default = generateToken;
