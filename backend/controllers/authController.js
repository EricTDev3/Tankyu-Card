import pool from "../db/db.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jwt-simple";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

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

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const data = "SELECT * FROM users WHERE email = $1";
    const result = await pool.query(data, [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const token = jwt.encode({ sub: user.email }, jwtSecret);

    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
