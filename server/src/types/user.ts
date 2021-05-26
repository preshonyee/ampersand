import mongoose, { Schema } from "mongoose";

// An interface that describes the properties
// that are required to create a new user
export interface UserAttrs {
  profilePicture: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  username: string;
}

// An interface that describes the properties that
// a User Model has
export interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties that
// a User Document has
export interface UserDoc extends mongoose.Document {
  _id: Schema.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  username: string;
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
