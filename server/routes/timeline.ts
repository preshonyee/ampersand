const express = require("express");
const {
  createTimelineActivity,
  getTimelineActivities,
} = require("../controllers/timeline");

const router = express.Router();

/**
 * app.use("/api/v1/timeline", timeline;)
 */

// create timeline route
router.route("/create").post(createTimelineActivity);
// get all timeline activities
router.route("/").get(getTimelineActivities);

module.exports = router;
