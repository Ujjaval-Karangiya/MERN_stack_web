import express from "express";
import { checkAuth, login, logout, signup, updateProfile } from "../controllers/authcontroller.js";
import { protectRoute } from "../middleware/authmiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.put("/updateprofile", protectRoute, updateProfile);

router.get("/check", protectRoute, checkAuth);

export default router;
