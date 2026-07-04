import express from "express";
import { signUp } from "../controllers/authController.js";
import { login } from "../controllers/authController.js";
import { logout } from "../controllers/authController.js";

const router = express.Router();

router.post("/signUp", signUp);
router.post("/login", login);
router.post("/logout", logout);

export default router;
