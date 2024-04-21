"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookController_1 = require("../controller/bookController");
const authController_1 = require("./../controller/authController");
const validation_1 = require("../middleware/validation");
const router = express_1.default.Router();
router.route('/').get(bookController_1.getAllBooks).post((0, validation_1.validateSchema)(validation_1.Shemas.book.create, 'body'), authController_1.protect, bookController_1.createBook).put((0, validation_1.validateSchema)(validation_1.Shemas.book.updateBook, 'body'), authController_1.protect, bookController_1.updateBook);
router.route('/:barcode').delete((0, validation_1.validateSchema)(validation_1.Shemas.book.deleteBook, 'params'), authController_1.protect, bookController_1.deleteBook);
exports.default = router;
