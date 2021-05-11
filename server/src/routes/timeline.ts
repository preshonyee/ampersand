import express from "express";
import requireLogin from "../middleware/requireLogin";
import {
  createTimelineActivity,
  getTimelineActivities,
} from "../controllers/timeline";

const router = express.Router();

/**
 * app.use("/api/v1/timeline", timeline;)
 */

// create timeline route
router
  .route("/")
  .post(createTimelineActivity)
  .get(requireLogin, getTimelineActivities);

export default router;
