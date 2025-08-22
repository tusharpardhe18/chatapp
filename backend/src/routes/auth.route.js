import express from "express";
import {
  login,
  signup,
  logout,
  updateProfile,
  checkAuth,
} from "../controllers/auth.controller.js";
import { portectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/update-profile", portectRoute, updateProfile);

router.get("/check", portectRoute, checkAuth);

export default router;
