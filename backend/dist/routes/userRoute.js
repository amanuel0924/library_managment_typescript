"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userControler_1 = require("../controller/userControler");
const validation_1 = require("../middleware/validation");
const authController_1 = require("./../controller/authController");
const router = express_1.default.Router();
router.route('/').get(authController_1.protect, userControler_1.getAllUser).put((0, validation_1.validateSchema)(validation_1.Shemas.user.update, 'body'), authController_1.protect, userControler_1.updateUser);
router.route('/:id').get((0, validation_1.validateSchema)(validation_1.Shemas.user.id, 'params'), authController_1.protect, userControler_1.getUserById).delete((0, validation_1.validateSchema)(validation_1.Shemas.user.id, 'params'), authController_1.protect, userControler_1.deleteUser);
exports.default = router;
