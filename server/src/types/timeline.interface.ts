import mongoose from "mongoose";

export interface ITimeline extends mongoose.Document {
  activityTitle: string;
  activityBody: {};
  activityType: "application" | "email" | "resume" | "radar";
  activityDate: Date;
}
