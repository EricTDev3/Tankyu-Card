import express from "express";
import {
  addCard,
  getCards,
  deleteCard,
  editCard,
  getCardInfo,
} from "../controllers/shoppingController.js";
import protect from "../middleware/protect.js";

const router = express.Router();

router.post("/addCard", protect, addCard);
router.get("/getCards", protect, getCards);
router.get("/getCardInfo", getCardInfo);
router.delete("/deleteCard", protect, deleteCard);
router.patch("/editCard", protect, editCard);

export default router;
