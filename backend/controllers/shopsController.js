import pool from "../db/db.js";
import dotenv from "dotenv";
import axios from "axios";
import { buildAllRoutes, formatRoutesForPrompt } from "../utils/routing.js";

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

export const getSavedShops = async (req, res) => {
  const userId = req.user.id;
  const shopData =
    "SELECT tcg_shops.*, tcg_shops.id as shop_id FROM tcg_shops JOIN saved_shops ON tcg_shops.id = saved_shops.shop_id WHERE user_id = $1";

  try {
    const result = await pool.query(shopData, [userId]);
    return res.status(200).json({ success: true, shopData: result.rows });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to get saved card shop data" });
  }
};

export const deleteSavedShop = async (req, res) => {
  const userId = req.user.id;
  const { shopId } = req.body;

  const removeShop =
    "DELETE FROM saved_shops WHERE user_id = $1 AND shop_id = $2";

  try {
    const result = await pool.query(removeShop, [userId, shopId]);
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete shop" });
  }
};

export const generateTripPlan = async (req, res) => {
  const userId = req.user.id;

  try {
    const shopData =
      "SELECT tcg_shops.*, tcg_shops.id as shop_id FROM tcg_shops JOIN saved_shops ON tcg_shops.id = saved_shops.shop_id WHERE user_id = $1";
    const result = await pool.query(shopData, [userId]);
    const shops = result.rows;

    if (shops.length === 0) {
      return res
        .status(200)
        .json({ message: "No shops found in your itinerary." });
    } else {
      const allRoutes = buildAllRoutes(shops);
      const promptText = formatRoutesForPrompt(allRoutes);

      const systemPrompt = `For each city, include the shop name and shop hours.  The order given is already optimized and in order of shortest distance between shops.

        Wrap each shop name in markdown bold (**like this**). Do not bold city names, hours, or the greeting.

        The store info format should be the following — if there are consecutive days with the same hours, condense them into a range:

        **TCG Blink**
        Sunday 11 AM–9 PM
        Monday-Friday 12 PM-10PM
        Saturday 11 AM–10 PM

        If the store hours are the same every day, use this format instead:

        **TCG Blink**
        Open 1-9PM Daily

        Start the response with: "Hello adventurer! Based on your itinerary, visit each store in the following order:"

        Only use data that's provided to generate the response — do not invent or guess details about a shop beyond its name and hours.`;

      const response = await axios.post(
        "https://api.openai.com/v1/responses",
        {
          model: "gpt-4o-mini",
          instructions: systemPrompt,
          input: promptText,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        },
      );
      const generatedResponse = response.data.output[0].content[0].text;

      return res.status(200).json({ tripPlan: generatedResponse });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to generate trip plan" });
  }
};
