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
    addedBy: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default model<IBaseApplication>("Application", ApplicationSchema);
