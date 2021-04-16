import express from "express";
import {
  createTimelineActivity,
  getTimelineActivities,
} from "../controllers/timeline";

const router = express.Router();

/**
 * app.use("/api/v1/timeline", timeline;)
 */

// create timeline route
router.route("/create").post(createTimelineActivity);
// get all timeline activities
router.route("/").get(getTimelineActivities);

export default router;
