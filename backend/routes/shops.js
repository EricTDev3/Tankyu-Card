import express from "express";
import { getAllShops, savedShops } from "../controllers/shopsController.js";
import protect from "../middleware/protect.js";

const router = express.Router();

router.get("/getAllShops", protect, getAllShops);
router.post("/savedShops", protect, savedShops);

export default router;
