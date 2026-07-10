import express from "express";
import {
  getAllShops,
  savedShops,
  getSavedShops,
} from "../controllers/shopsController.js";
import protect from "../middleware/protect.js";

const router = express.Router();

router.get("/getAllShops", protect, getAllShops);
router.post("/savedShops", protect, savedShops);
router.get("/getSavedShops", protect, getSavedShops);

export default router;
