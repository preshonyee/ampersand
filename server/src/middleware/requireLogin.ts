import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { UserDoc } from "user";
import { IGetUserAuthInfoRequest } from "user-auth";
import { IUser } from "user.interface";
import { User } from "../models/User";
import ErrorResponse from "../utils/errorResponse";

const requireLogin = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(new ErrorResponse("You must be logged in", 401));
  }

  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.JWT_SECRET, (error, payload: any) => {
    if (error) {
      return next(new ErrorResponse("You must be logged in", 401));
    }
    const { _id } = payload;
    User.findById(_id).then((userData: UserDoc) => {
      req.user = userData;
      next();
    });
  });
};

export default requireLogin;
