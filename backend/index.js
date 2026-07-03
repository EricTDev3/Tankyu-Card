import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import shoppingRoutes from "./routes/shoppingList.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/shoppingList", shoppingRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
