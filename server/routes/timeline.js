const express = require("express");
const { createTimelineActivity } = require("../controllers/timeline");
const requireLogin = require("../middleware/requireLogin");

const router = express.Router();

/**
 * app.use("/api/v1/timeline", timeline;)
 */

// create timeline route
router.route("/create").post(createTimelineActivity);

module.exports = router;
