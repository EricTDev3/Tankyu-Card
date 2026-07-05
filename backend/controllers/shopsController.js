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
