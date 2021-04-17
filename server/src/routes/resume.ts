import express from "express";
import {
  createResume,
  myResume,
  updateResume,
  deleteResume,
} from "../controllers/resume";

import requireLogin from "../middleware/requireLogin";

const router = express.Router();

// app.use("/api/v1/resume", resume);

// create resume, get resume
router.route("/").post(requireLogin, createResume).get(requireLogin, myResume);

// update resume, delete resume
router
  .route("/:resumeID")
  .put(requireLogin, updateResume)
  .delete(requireLogin, deleteResume);

export default router;
