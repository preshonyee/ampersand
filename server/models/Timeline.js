const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const TimelineSchema = new mongoose.Schema(
  {
    activityTitle: {
      type: String,
      required: [true, "Please add an activity title"],
    },
    activityBody: {
      type: String,
      required: [true, "Please add an activity body"],
    },
    activityType: {
      type: String,
      enum: ["application", "email", "resume", "radar"],
      required: [true, "Please add an activity type"],
    },
    activityDate: {
      type: Date,
      default: Date.now,
      required: [true, "Please add an activity date"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Timeline", TimelineSchema);
