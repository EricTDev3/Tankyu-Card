import express from "express";
import {
  addCard,
  getCards,
  deleteCard,
  editCard,
  getCardInfo,
  identifyCard,
} from "../controllers/shoppingController.js";
import protect from "../middleware/protect.js";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post("/addCard", protect, addCard);
router.get("/getCards", protect, getCards);
router.get("/getCardInfo", getCardInfo);
router.delete("/deleteCard", protect, deleteCard);
router.patch("/editCard", protect, editCard);
router.post("/identifyCard", upload.single("image"), identifyCard);

export default router;
