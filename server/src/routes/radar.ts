import express from "express";
import { createRadar, getRadarEntries } from "../controllers/radar";

import requireLogin from "../middleware/requireLogin";

const router = express.Router();

// app.use("/api/v1/radar", radar);

router
  .route("/")
  .post(requireLogin, createRadar)
  .get(requireLogin, getRadarEntries);

export default router;
