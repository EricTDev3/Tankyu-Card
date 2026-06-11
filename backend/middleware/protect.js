import jwt from "jwt-simple";
import pool from "../db/db.js";
import dotenv from "dotenv";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "header is undefined" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const payload = jwt.decode(token, jwtSecret);
    const data = "SELECT * FROM users WHERE email = $1";
    const result = await pool.query(data, [payload.email]);
    const user = result.rows[0];
    req.user = user;
    next();
  } catch (err) {
    console.log("jwt error:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default protect;
