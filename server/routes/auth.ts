const express = require("express");
const { signup, signin, getMe } = require("../controllers/auth");

const requireLogin = require("../middleware/requireLogin");

const router = express.Router();

/**
 * app.use("/api/v1/auth", auth);
 */

router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/me").get(requireLogin, getMe);

module.exports = router;
