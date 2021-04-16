import { Schema, model } from "mongoose";

const RadarSchema = new Schema(
  {
    avatar: {
      type: String,
    },
    companyName: {
      type: String,
      required: true,
    },
    linkToCareersPage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model("Radar", RadarSchema);
