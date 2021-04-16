import express from "express";
import {
  createProfile,
  myProfile,
  updateProfile,
  deleteProfile,
} from "../controllers/profile";

import requireLogin from "../middleware/requireLogin";

const router = express.Router();

// app.use("/api/v1/profile", profile);

// create resume profile
router.route("/createProfile").post(requireLogin, createProfile);
// get all logged in use resume profile
router.route("/myProfile").get(requireLogin, myProfile);
// update resume profile
router.route("/update/:profileID").put(requireLogin, updateProfile);
// delete resume profile
router.route("/delete/:profileID").delete(requireLogin, deleteProfile);

export default router;
