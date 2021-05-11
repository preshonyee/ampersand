import mongoose from "mongoose";
import { UserType } from "user-auth";

export interface IBaseApplication extends mongoose.Document {
  dateApplied: Date;
  company: string;
  location: string;
  position: string;
  type: "Part Time" | "Full Time" | "Contract" | "Internship" | "Agency";
  referral: "YES" | "NO";
  remote: "Fully Remote" | "Remote (US-Only)" | "No Remote" | "Remote/On-site";
  status:
    | "Prospect"
    | "Applied"
    | "First Interviews"
    | "Requires Follow-up"
    | "Negotiating Offer"
    | "Closed"
    | "Hired";
  likelihoodOfHiring:
    | "0%: Declined offer"
    | "0%: Lost opportunity"
    | "5%: Too early to tell"
    | "10%: Made contact"
    | "10%: Weak Phone screening"
    | "15%: Scheduled Phone Screening"
    | "15%: Weak first round interview"
    | "20%: Strong Phone screen"
    | "25%: Weak second round interview"
    | "30%: Scheduled Interviews"
    | "40%: Strong first round interviews"
    | "50%: Scheduled second round interviews"
    | "60%: Strong second round interviews"
    | "80%: Received offer"
    | "100%: Accepted offer";
  tags:
    | "Benefits"
    | "Internal Connections"
    | "Below Desired Salary"
    | "Above Desired Salary"
    | "Within Salary Range"
    | "Equity"
    | "Hourly Salary"
    | "Required Travel"
    | "Strong Parental Leave Policy"
    | "Weak Parental Leave Policy";
}

export interface IApplication extends IBaseApplication {
  addedBy: UserType;
}
