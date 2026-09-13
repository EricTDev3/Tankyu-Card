import express from "express";
import {
  getAllShops,
  savedShops,
  getSavedShops,
  deleteSavedShop,
  generateTripPlan,
} from "../controllers/shopsController.js";
import protect from "../middleware/protect.js";

const router = express.Router();

router.get("/getAllShops", protect, getAllShops);
router.post("/savedShops", protect, savedShops);
router.get("/getSavedShops", protect, getSavedShops);
router.delete("/deleteSavedShop", protect, deleteSavedShop);
router.get("/generateTripPlan", protect, generateTripPlan);

export default router;
