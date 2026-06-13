import express from "express";
import { addCard } from "../controllers/shoppingController.js";
import protect from "../middleware/protect.js";

const router = express.Router();

router.post("/addCard", protect, addCard);

export default router;
