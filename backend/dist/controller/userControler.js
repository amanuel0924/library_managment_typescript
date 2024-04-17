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
exports.getAllUser = exports.deleteUser = exports.updateUser = exports.getUserById = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const getAllUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.default.find({});
        res.status(200).json({ message: "success", users });
    }
    catch (error) {
        res.status(400);
        next(error);
    }
});
exports.getAllUser = getAllUser;
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const user = yield userModel_1.default.findById(id);
        if (user) {
            res.status(200).json({ message: "success", user });
        }
    }
    catch (error) {
        res.status(400);
        next(error);
    }
});
exports.getUserById = getUserById;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id;
    const user = req.body;
    try {
        const updatedUser = yield userModel_1.default.findByIdAndUpdate(id, user, { new: true });
        if (updatedUser) {
            res.status(200).json({ message: "success", user: updatedUser });
        }
    }
    catch (error) {
        res.status(400);
        next(error);
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const deletedUser = yield userModel_1.default.findByIdAndDelete(id);
        if (deletedUser) {
            res.status(200).json({ message: "delete success" });
        }
    }
    catch (error) {
        res.status(400);
        next(error);
    }
});
exports.deleteUser = deleteUser;
