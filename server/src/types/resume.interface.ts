import mongoose from "mongoose";
import { UserType } from "user-auth";

export interface BaseResume extends mongoose.Document {
  firstName: string;
  lastName: string;
  occupation: string;
  location: string;
  website: string;
  email: string;
  telephone: string;
  education: [];
  skills: [];
  projects: [];
  experience: [];
  achievements: [];
}

export interface IResume extends BaseResume {
  addedBy: UserType;
}
