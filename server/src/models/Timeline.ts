import { Schema, model } from "mongoose";
import { ITimeline } from "timeline.interface";

const { ObjectId } = Schema.Types;

const TimelineSchema = new Schema(
  {
    activityTitle: {
      type: String,
      required: [true, "Please add an activity title"],
    },
    activityBody: {
      message: {
        type: String,
        required: [true, "Please include an activity message"],
      },
      company: {
        type: String,
      },
      location: {
        type: String,
      },
      position: {
        type: String,
      },
      type: {
        type: String,
        enum: ["Part Time", "Full Time", "Contract", "Agency"],
      },
    },
    activityType: {
      type: String,
      enum: ["application", "email", "resume", "radar"],
      required: [true, "Please add an activity type"],
    },
    activityDate: {
      type: Date,
      default: Date.now,
    },
    addedBy: {
      type: ObjectId,
      ref: "User",
      required: [true, "You must be logged in"],
    },
  },
  { timestamps: true }
);

export default model<ITimeline>("Timeline", TimelineSchema);
