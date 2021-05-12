import mongoose, { Schema } from "mongoose";

export interface IUser extends mongoose.Document {
  _id: Schema.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
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
}
