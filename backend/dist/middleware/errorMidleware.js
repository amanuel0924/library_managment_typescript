"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFound = void 0;
const notFound = (req, res, next) => {
    res.status(404);
    throw new Error(`Not Found - ${req.originalUrl}`);
};
exports.notFound = notFound;
const errorHandler = (error, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = error.message;
    console.log(error.stack);
    // Check for Mongoose CastError
    if (error.name === 'CastError') {
        statusCode = 404;
        message = 'Resource not found';
    }
    // Check for Mongoose duplicate key error
    if (error.code === 11000) {
        statusCode = 400;
        message = 'Duplicate field value entered';
    }
    // Check for Mongoose validation error
    if (error.name === 'ValidationError') {
        statusCode = 400;
        message = Object.values(error.errors)
            .map((val) => val.message)
            .join(', ');
    }
    res.status(statusCode).json({
        message,
        error: error.stack,
    });
};
exports.errorHandler = errorHandler;
