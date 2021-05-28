import mongoose from "mongoose";
import { UserType } from "user-auth";

export interface IBaseApplication extends mongoose.Document {
  dateApplied: Date;
  company: string;
  location: string;
  position: string;
  type: "Part Time" | "Full Time" | "Contract" | "Internship" | "Agency";
  status:
    | "Prospect"
    | "Applied"
    | "First Interviews"
    | "Requires Follow-up"
    | "Negotiating Offer"
    | "Closed"
    | "Hired";
}

export interface IApplication extends IBaseApplication {
  addedBy: UserType;
}
