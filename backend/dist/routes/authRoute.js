"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controller/authController");
const validation_1 = require("../middleware/validation");
const router = express_1.default.Router();
router.route('/register').post((0, validation_1.validateSchema)(validation_1.Shemas.user.create, 'body'), authController_1.register);
router.route('/login').post((0, validation_1.validateSchema)(validation_1.Shemas.user.login, 'body'), authController_1.login);
exports.default = router;
