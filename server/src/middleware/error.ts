import { Request, Response, NextFunction } from "express";
import ErrorResponse from "../utils/errorResponse";

const errorHandler = (
  err: any, // TODO: fix this any type
  req: Request,
  res: any,
  next: NextFunction
) => {
  let error = { ...err };

  error.message = err.message;

  // Log to console for the developer
  console.log({ err });

  // Mongoose bad ObjectID
  if (err.name === "CastError") {
    // const message = `Resource not found with ID of ${err.value}
    const message = `Resource not found`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = `Duplicate field value entered: ${Object.keys(
      err.keyValue
    )} field should be unique`;

    error = new ErrorResponse(message, 400);
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val: any) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

export default errorHandler;
