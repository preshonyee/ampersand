const express = require("express");
const {
  createProfile,
  myProfile,
  updateProfile,
} = require("../controllers/profile");

const requireLogin = require("../middleware/requireLogin");

const router = express.Router();

// app.use("/api/v1/profile", profile);

// create resume profile
router.route("/createProfile").post(requireLogin, createProfile);
// get all logged in use resume profile
router.route("/myProfile").get(requireLogin, myProfile);
// update resume profile
router.route("/update/:profileID").get(requireLogin, updateProfile);

module.exports = router;
