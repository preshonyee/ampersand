const express = require("express");
const { createRadar } = require("../controllers/radar");

const requireLogin = require("../middleware/requireLogin");

const router = express.Router();

// app.use("/api/v1/radar", radar);

// create radar
router.route("/").post(requireLogin, createRadar);

module.exports = router;
