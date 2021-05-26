import { Schema, model } from "mongoose";
import { IBaseApplication } from "application.interface";

const { ObjectId } = Schema.Types;

const ApplicationSchema = new Schema(
  {
    dateApplied: {
      type: Date,
      default: Date.now,
      required: [true, "Please add an application date"],
    },
    company: {
      type: String,
      required: [true, "Please add a company"],
    },
    location: {
      type: String,
      required: [true, "Please add a location"],
    },
    position: {
      type: String,
      required: [true, "Please add a position"],
    },
    type: {
      type: String,
      enum: ["Part Time", "Full Time", "Contract", "Internship", "Agency"],
      required: [true, "Please choose a type"],
    },
    status: {
      type: String,
      enum: [
        "Prospect",
        "Applied",
        "First Interviews",
        "Requires Follow-up",
        "Negotiating Offer",
        "Closed",
        "Hired",
      ],
      required: [true, "Please select a status option"],
    },
    likelihoodOfHiring: {
      type: String,
      enum: [
        "0%: Declined offer",
        "0%: Lost opportunity",
        "5%: Too early to tell",
        "10%: Made contact",
        "10%: Weak Phone screening",
        "15%: Scheduled Phone Screening",
        "15%: Weak first round interview",
        "20%: Strong Phone screen",
        "25%: Weak second round interview",
        "30%: Scheduled Interviews",
        "40%: Strong first round interviews",
        "50%: Scheduled second round interviews",
        "60%: Strong second round interviews",
        "80%: Received offer",
        "100%: Accepted offer",
      ],
      required: [true, "Please select an option"],
    },
    tags: {
      type: [String],
      enum: [
        "Benefits",
        "Internal Connections",
        "Below Desired Salary",
        "Above Desired Salary",
        "Within Salary Range",
        "Equity",
        "Hourly Salary",
        "Required Travel",
        "Strong Parental Leave Policy",
        "Weak Parental Leave Policy",
      ],
    },
    addedBy: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default model<IBaseApplication>("Application", ApplicationSchema);
