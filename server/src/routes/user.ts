import express from "express";
import { getUser } from "../controllers/user";
import requireLogin from "../middleware/requireLogin";

const router = express.Router();

/**
 * app.use("/api/v1/user", user;
 */

router.route("/").get(requireLogin, getUser);

export default router;
