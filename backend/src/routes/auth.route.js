import express from "express";
import { login , signup , logout, updateProfile, checkAuth } from "../controllers/auth.controller.js";
// If auth.middleware.js is in the same folder as auth.route.js
// import { protectRoute } from "./auth.middleware.js";

// If it's in backend/src/middlewares/ (check your structure)
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);

router.put("/update", protectRoute, updateProfile);
router.get("/checkauth", protectRoute, checkAuth);


export default router;

