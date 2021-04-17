import express from "express";
import {
  signup,
  signin,
  getMe,
  logout,
  updateDetails,
  updatePassword,
  deleteUser,
} from "../controllers/auth";

import requireLogin from "../middleware/requireLogin";

const router = express.Router();

/**
 * app.use("/api/v1/auth", auth);
 */

router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/logout").get(logout);
router.route("/me").get(requireLogin, getMe);
router.route("/update-details").put(requireLogin, updateDetails);
router.route("/update-password").put(requireLogin, updatePassword);
router.route("/delete-user").delete(requireLogin, deleteUser);

export default router;
