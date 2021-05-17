import mongoose from "mongoose";

// An interface that describes the properties
// that are required to create a new user
export interface UserAttrs {
  profilePicture: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// An interface that describes the properties that
// a User Model has
export interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties that
// a User Document has
export interface UserDoc extends mongoose.Document {
  profilePicture: string;
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
