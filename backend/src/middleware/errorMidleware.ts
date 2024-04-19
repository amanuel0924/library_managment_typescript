import { Request, Response, NextFunction } from 'express';

const notFound = (req: Request, res: Response, next: NextFunction) => {
    res.status(404)
    throw new Error(`Not Found - ${req.originalUrl}`)
};

const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = error.message;
 
 console.log(error.stack)
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
      .map((val: any) => val.message)
      .join(', ');
  }

  res.status(statusCode).json({
    message,
    error: error.stack,
  });
};

export { notFound, errorHandler };
