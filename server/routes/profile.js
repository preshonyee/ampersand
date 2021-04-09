const express = require("express");
const { createProfile, myProfile } = require("../controllers/profile");

const requireLogin = require("../middleware/requireLogin");

const router = express.Router();

// app.use("/api/v1/profile", profile);

router.route("/createProfile").post(requireLogin, createProfile);
router.route("/myProfile").get(requireLogin, myProfile);

module.exports = router;
