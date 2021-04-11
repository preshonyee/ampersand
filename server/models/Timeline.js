const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const TimelineSchema = new mongoose.Schema(
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
      remote: {
        type: String,
        enum: ["Fully Remote", "Remote (US-Only)", "No Remote"],
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Timeline", TimelineSchema);
