"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userControler_1 = require("../controller/userControler");
const authController_1 = require("./../controller/authController");
const router = express_1.default.Router();
router.route('/').get(authController_1.protect, userControler_1.getAllUser).put(authController_1.protect, userControler_1.updateUser);
router.route('/:id').get(authController_1.protect, userControler_1.getUserById).delete(authController_1.protect, userControler_1.deleteUser);
exports.default = router;
