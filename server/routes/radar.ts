const express = require("express");
const { createRadar, getRadarEntries } = require("../controllers/radar");

const requireLogin = require("../middleware/requireLogin");

const router = express.Router();

// app.use("/api/v1/radar", radar);

router
  .route("/")
  .post(requireLogin, createRadar)
  .get(requireLogin, getRadarEntries);

module.exports = router;
