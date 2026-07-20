import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import shoppingRoutes from "./routes/shoppingList.js";
import shopsRoutes from "./routes/shops.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: ["http://localhost:3000", "https://tankyu-card.vercel.app"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/shoppingList", shoppingRoutes);
app.use("/shops", shopsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
