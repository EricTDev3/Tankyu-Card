import express from "express";
import {
  addCard,
  getCards,
  deleteCard,
} from "../controllers/shoppingController.js";
import protect from "../middleware/protect.js";

const router = express.Router();

router.post("/addCard", protect, addCard);
router.get("/getCards", protect, getCards);
router.delete("/deleteCard", protect, deleteCard);

export default router;
