import ErrorResponse from "../utils/errorResponse";
import User from "../models/User";
import Application from "../models/Application";
import Radar from "../models/Radar";
import { IGetUserAuthInfoRequest, UserType } from "user-auth";
import { NextFunction, Response } from "express";
import { IApplication } from "application.interface";
import { IRadar } from "radar.interface";
import { IUser } from "user.interface";

// @description:    Get logged in user profile
// @route:          GET /api/v1/user
// @access          Private
const getUser = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  const applications = await Application.find({ addedBy: req.user._id }).then(
    (applications: IApplication[]) => {
      return applications.length;
    }
  );

  const radar = await Radar.find({ addedBy: req.user._id }).then(
    (radar: IRadar[]) => {
      return radar.length;
    }
  );

  User.findById(req.user.id)
    .then((user: IUser) => {
      return res.status(200).json({
        success: true,
        data: {
          user,
          coverLetter: 0,
          applications,
          radar,
        },
      });
    })
    .catch((error) => {
      console.log(error);
      return next(new ErrorResponse(error, 422));
    });
};

// @description:    Update user profile picture
// @route:          PUT /api/v1/user/picture
// @access          Private
const updateProfilePicture = (req: IGetUserAuthInfoRequest, res: Response) => {
  User.findByIdAndUpdate(
    req.user._id,
    { $set: { profilePicture: req.body.profilePicture } },
    { new: true },
    (error, result: IUser) => {
      if (error) {
        return res.status(422).json({
          success: false,
          message: "Could not update profile picture",
        });
      }
      res.json({
        success: true,
        result: {
          profilePicture: result.profilePicture,
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email,
          _id: result._id,
        },
        message: "Profile picture updated successfully",
      });
    }
  );
};

export { getUser, updateProfilePicture };
