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
exports.deleteBook = exports.updateBook = exports.getBookById = exports.createBook = exports.getAllBooks = void 0;
const bookModel_1 = __importDefault(require("../models/bookModel"));
const getAllBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield bookModel_1.default.find({});
        res.status(200).json({ message: "success", books });
    }
    catch (error) {
        res.status(400);
        next(error);
    }
});
exports.getAllBooks = getAllBooks;
const createBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const book = req.body;
    try {
        const newBook = yield bookModel_1.default.create(book);
        res.status(201).json({ message: "success", book: newBook });
    }
    catch (error) {
        res.status(400);
        next(error);
    }
});
exports.createBook = createBook;
const getBookById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const book = yield bookModel_1.default.findById(id);
        if (book) {
            res.status(200).json({ message: "success", book });
        }
    }
    catch (error) {
        res.status(400);
        next(error);
    }
});
exports.getBookById = getBookById;
const updateBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const book = req.body;
    try {
        const updatedBook = yield bookModel_1.default.findOneAndUpdate({ barcode: book.barcode }, book, { new: true });
        if (updatedBook) {
            res.status(200).json({ message: "success", book: updatedBook });
        }
    }
    catch (error) {
        res.status(400);
        next(error);
    }
});
exports.updateBook = updateBook;
const deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { barcode: string } = req.params;
    try {
        const deletedBook = yield bookModel_1.default.findOneAndDelete({ barcode: string });
        if (deletedBook) {
            res.status(200).json({ message: "delete success" });
        }
    }
    catch (error) {
        res.status(400);
        next(error);
    }
});
exports.deleteBook = deleteBook;
