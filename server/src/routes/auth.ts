import express from "express";
import { signup, signin, getMe } from "../controllers/auth";

import requireLogin from "../middleware/requireLogin";

const router = express.Router();

/**
 * app.use("/api/v1/auth", auth);
 */

router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/me").get(requireLogin, getMe);

export default router;
