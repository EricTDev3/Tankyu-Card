import pool from "../db/db.js";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

export const addCard = async (req, res) => {
  const { name, set, marketPrice } = req.body;
  const userId = req.user.id;

  const cardData =
    "INSERT INTO shopping_list(name, set, market_price, user_id) Values($1, $2, $3, $4) RETURNING *";

  try {
    const result = await pool.query(cardData, [name, set, marketPrice, userId]);
    return res
      .status(201)
      .json({ success: true, shopping_list: result.rows[0] });
  } catch (error) {
    return res.status(500).json({ error: "Failed to add new card data" });
  }
};

export const getCards = async (req, res) => {
  const userId = req.user.id;

  const cardList = "SELECT * FROM shopping_list WHERE user_id = $1";

  try {
    const result = await pool.query(cardList, [userId]);
    return res.status(200).json({ success: true, shopping_list: result.rows });
  } catch (error) {
    return res.status(500).json({ error: "Failed to get card list" });
  }
};

export const getCardInfo = async (req, res) => {
  const { q } = req.query;

  try {
    if (!q) {
      return res.status(400).json({ error: "No query entered" });
    }

    const result = await axios.get(
      `https://api.cardsight.ai/v1/catalog/search?q=${q}`,
      {
        headers: {
          "X-API-Key": process.env.TCG_API,
        },
      },
    );

    const filteredResults = result.data.results
      .filter((card) => card.type === "card")
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, 5);

    const imagePromises = filteredResults.map((card) => {
      return getImageById(card.id);
    });

    const images = await Promise.allSettled(imagePromises);

    const mergedResults = filteredResults.map((card, index) => {
      if (images[index].status === "fulfilled") {
        return { ...card, image: images[index].value };
      } else {
        return { ...card, image: null };
      }
    });

    return res.status(200).json(mergedResults);
  } catch (error) {
    return res.status(500).json({ error: "Failed to get card info" });
  }
};

const getImageById = async (id) => {
  const result = await axios.get(
    `https://api.cardsight.ai/v1/images/cards/${id}?format=json`,
    {
      headers: {
        "X-API-Key": process.env.TCG_API,
      },
    },
  );
  return result.data;
};

export const deleteCard = async (req, res) => {
  const { cardId } = req.body;
  const userId = req.user.id;

  const selectedCard =
    "DELETE FROM shopping_list WHERE shopping_list.id = $1 and shopping_list.user_id = $2";

  try {
    const result = await pool.query(selectedCard, [cardId, userId]);
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete card" });
  }
};

export const editCard = async (req, res) => {
  const { name, cardSet, marketPrice, cardId } = req.body;
  const userId = req.user.id;

  const cardToEdit =
    "UPDATE shopping_list SET name = $1, set = $2, market_price = $3 WHERE id = $4 and user_id = $5";

  try {
    const result = await pool.query(cardToEdit, [
      name,
      cardSet,
      marketPrice,
      cardId,
      userId,
    ]);
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: "Failed to edit card" });
  }
};
