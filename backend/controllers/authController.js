import pool from "../db/db.js";
import bcrypt from "bcrypt";

export const signUp = async (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const data = "INSERT INTO users(email, password) VALUES($1, $2) RETURNING *";

  try {
    const result = await pool.query(data, [email, hashedPassword]);
    return res.status(200).json({ success: true, user: result.rows[0] });
  } catch (error) {
    return res.status(500).json({ error: "Failed to create user" });
  }
};
