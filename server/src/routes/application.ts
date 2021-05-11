import express from "express";
import {
  createApplication,
  getUserApplications,
  deleteApplication,
  updateApplication,
  getApplication,
} from "../controllers/application";

import requireLogin from "../middleware/requireLogin";

const router = express.Router();

/**
 * app.use("/api/v1/application", application;
 */

// create application route
router
  .route("/")
  .post(requireLogin, createApplication)
  .get(requireLogin, getUserApplications);
// get single application
router
  .route("/:applicationID")
  .get(requireLogin, getApplication)
  .delete(requireLogin, deleteApplication)
  .put(requireLogin, updateApplication);

export default router;
