import express from "express";
import { getUser, updateProfilePicture } from "../controllers/user";
import requireLogin from "../middleware/requireLogin";

const router = express.Router();

/**
 * app.use("/api/v1/user", user;
 */

router.route("/").get(requireLogin, getUser);
router.route("/picture").put(requireLogin, updateProfilePicture);

export default router;
