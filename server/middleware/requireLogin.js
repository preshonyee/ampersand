const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(new ErrorResponse("You must be logged in", 401));
  }

  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
    if (error) {
      return next(new ErrorResponse("You must be logged in", 401));
    }
    const { _id } = payload;
    User.findById(_id).then((userData) => {
      req.user = userData;
      next();
    });
  });
};
