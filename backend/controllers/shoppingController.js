import pool from "../db/db.js";
import dotenv from "dotenv";

dotenv.config();

export const addCard = async (req, res) => {
  const { name, set, marketPrice } = req.body;
  const userId = req.user.id;

  const cardData =
    "INSERT INTO shopping_list(name, set, market_price, user_id) Values($1, $2, $3, $4) RETURNING *";

  try {
    const result = await pool.query(cardData, [name, set, marketPrice, userId]);
    return res
      .status(200)
      .json({ success: true, shopping_list: result.rows[0] });
  } catch (error) {
    return res.status(500).json({ error: "Failed to add new card data" });
  }
};
