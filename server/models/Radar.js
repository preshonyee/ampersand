const mongoose = require("mongoose");

const RadarSchema = new mongoose.Schema(
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

module.exports = mongoose.model("Radar", RadarSchema);
