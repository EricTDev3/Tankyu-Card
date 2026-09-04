import pool from "../db/db.js";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

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

export const identifyCard = async (req, res) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

  try {
    if (!req.file || !allowedTypes.includes(req.file.mimetype)) {
      return res
        .status(400)
        .json({ error: "Unsupported or missing image file" });
    }

    const result = await axios.post(
      "https://api.cardsight.ai/v1/identify/card",
      req.file.buffer,
      {
        headers: {
          "X-API-Key": process.env.TCG_API,
          "Content-Type": req.file.mimetype,
        },
      },
    );

    if (result.data.detections.length !== 0) {
      const cardData = result.data.detections[0].card;
      const manufacturer =
        cardData.manufacturer ||
        cardData.manufacturerName ||
        "";

      let image = null;
      try {
        const imageResult = await getImageById(cardData.id);
        image = imageResult?.data ?? null;
      } catch (imageError) {
        console.error(imageError);
      }

      return res.status(200).json({
        id: cardData.id,
        name: cardData.name,
        set: manufacturer,
        image,
      });
    } else {
      return res
        .status(400)
        .json({ error: "No card detected from the provided image." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to identify card" });
  }
};

export const addCard = async (req, res) => {
  const { name, set, marketPrice, cardId, cardImage } = req.body;
  const userId = req.user.id;

  const cardData =
    "INSERT INTO shopping_list(name, set, market_price, user_id, card_id, card_image) Values($1, $2, $3, $4, $5, $6) RETURNING *";

  try {
    const result = await pool.query(cardData, [
      name,
      set,
      marketPrice,
      userId,
      cardId,
      cardImage,
    ]);
    return res
      .status(201)
      .json({ success: true, shopping_list: result.rows[0] });
  } catch (error) {
    console.error(error);
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
