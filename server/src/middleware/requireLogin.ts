import jwt from "jsonwebtoken";
import User from "../models/User";
import ErrorResponse from "../utils/errorResponse";

// TODO: Fix all any types

const requireLogin = (req: any, res: any, next: any) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(new ErrorResponse("You must be logged in", 401));
  }

  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.JWT_SECRET, (error: any, payload: any) => {
    if (error) {
      return next(new ErrorResponse("You must be logged in", 401));
    }
    const { _id } = payload;
    User.findById(_id).then((userData: any) => {
      req.user = userData;
      next();
    });
  });
};

export default requireLogin;
