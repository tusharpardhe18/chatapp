import express from "express";
import { portectRoute } from "../middleware/auth.middleware.js";
import { getUsersForSidebar } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", portectRoute, getUsersForSidebar);
router.get("/:id", portectRoute, getMessages);

router.post("/send/:id", portectRoute, sendMessage);

export default router;
