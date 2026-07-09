import pool from "../db/db.js";
import dotenv from "dotenv";

dotenv.config();

export const getAllShops = async (req, res) => {
  const shopData = "SELECT * FROM tcg_shops";

  try {
    const result = await pool.query(shopData);
    return res.status(200).json({ success: true, shops: result.rows });
  } catch (error) {
    return res.status(500).json({ error: "Failed to get card shop data" });
  }
};

export const savedShops = async (req, res) => {
  const { shopId } = req.body;
  const userId = req.user.id;

  const shopData =
    "INSERT INTO saved_shops (user_id, shop_id) VALUES($1, $2) RETURNING *";

  try {
    const result = await pool.query(shopData, [userId, shopId]);
    return res
      .status(201)
      .json({ success: true, user_shop_pair: result.rows[0] });
  } catch (error) {
    return res.status(500).json({ error: "Failed to get card shop data" });
  }
};
