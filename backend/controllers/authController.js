import pool from "../db/db.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv/config";
import jwt from "jwt-simple";

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

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 14 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logged out" });
};
