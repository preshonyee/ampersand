import mongoose from "mongoose";

export interface IRadar extends mongoose.Document {
  avatar: string;
  companyName: string;
  linkToCareersPage: string;
}
