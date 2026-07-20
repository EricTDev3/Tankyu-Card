"use client";
import { useState } from "react";
import ShoppingForm from "./ShoppingForm";
import CardEditingModal from "./CardEditingModal";
import axios from "axios";
import { IconButton } from "@material-tailwind/react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

export default function ShoppingList() {
  const [cardList, setCardList] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [editClicked, setEditClicked] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    cardSet: "",
    marketPrice: "",
  });

  const handleEditCard = (card) => {
    setEditClicked(true);
    setSelectedCard(card);
    setFormData({
      name: card.name,
      cardSet: card.set,
      marketPrice: card.market_price,
    });
  };

  const getCardsList = async () => {
    try {
      const response = await axios.get("/api/shoppingList/getCards", {
        withCredentials: true,
      });
      setCardList(response.data.shopping_list);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCard = async (cardId) => {
    try {
      const response = await axios.delete("/api/shoppingList/deleteCard", {
        withCredentials: true,
        data: { cardId },
      });
      const updatedCardList = cardList.filter((card) => card.id !== cardId);
      setCardList(updatedCardList);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex flex-col items-center flex-1 min-h-screen overflow-y-auto">
        {editClicked && (
          <CardEditingModal
            formData={formData}
            setFormData={setFormData}
            setEditClicked={setEditClicked}
            selectedCard={selectedCard}
            getCardsList={getCardsList}
          />
        )}
        <ShoppingForm getCardsList={getCardsList} />
        <table className="table mx-auto w-auto bg-gray-200 mt-6">
          <thead>
            <tr className="text-blue-600">
              <th className="px-8">Name</th>
              <th className="px-8">Set</th>
              <th className="px-8">Market Price</th>
              <th className="px-8">Action</th>
            </tr>
          </thead>
          <tbody>
            {cardList.map((card) => (
              <tr key={card.id}>
                <td className="px-8">{card.name}</td>
                <td className="px-8">{card.set}</td>
                <td className="px-8">${card.market_price}</td>
                <td className="px-8 flex gap-2">
                  <IconButton onClick={() => handleEditCard(card)}>
                    <PencilSquareIcon className="h-5 w-5 cursor-pointer bg-blue-500 hover:bg-sky-800 active:border-b-0 active:translate-y-[4px] active:shadow-none transition-all" />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteCard(card.id)}>
                    <TrashIcon className="h-5 w-5 bg-red-500 hover:bg-red-800 cursor-pointer active:border-b-0 active:translate-y-[4px] active:shadow-none transition-all" />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
