const express = require("express");
const {
  createApplication,
  getUserApplications,
  deleteApplication,
  updateApplication,
  getApplication,
} = require("../controllers/application");

const requireLogin = require("../middleware/requireLogin");

const router = express.Router();

/**
 * app.use("/api/v1/application", application;
 */

// create application route
router.route("/createApplication").post(requireLogin, createApplication);
// get all applications route
router.route("/myApplications").get(requireLogin, getUserApplications);
// get single application
router.route("/:applicationID").get(requireLogin, getApplication);
// delete application
router.route("/delete/:applicationID").delete(requireLogin, deleteApplication);
// update application
router.route("/update/:applicationID").put(requireLogin, updateApplication);

module.exports = router;
