import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getUserForSidebar, getMessages, sendMessage } from "../controllers/message.controllers.js"; // ✅ added import

const router = express.Router();

router.get("/user", protectRoute, getUserForSidebar);
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

export default router;
