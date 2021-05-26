import { Request } from "express";
import { Schema } from "mongoose";

export type UserType = {
  _id: Schema.Types.ObjectId;
  id?: Schema.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  resetPasswordToken: string;
  resetPasswordExpire: Date;
  profilePicture: string;
  location: string;
  portfolio: string;
  bio: string;
  interests: string;
  twitter: string;
  linkedin: string;
  github: string;
};

export interface IGetUserAuthInfoRequest extends Request {
  user: UserType;
}
