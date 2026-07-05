import express from "express";
import { getAllShops } from "../controllers/shopsController.js";
import protect from "../middleware/protect.js";

const router = express.Router();

router.get("/getAllShops", protect, getAllShops);

export default router;
