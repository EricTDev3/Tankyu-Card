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
    <div className="flex h-screen bg-[url('/images/cardShops.png')] bg-cover bg-center bg-no-repeat">
      <div className="flex flex-col mt-50 md:mt-48 md:ml-30 md:items-center items-start flex-1 min-h-screen overflow-y-auto">
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
        <div className="md:w-3/4 mx-auto mt-6 bg-[url('/images/woodenBoard.png')] bg-cover bg-center bg-no-repeat rounded-lg p-4">
          <table className="table w-full">
            <thead>
              <tr className="text-white text-center">
                <th className="pl-6">Name</th>
                <th>Set</th>
                <th>Market Price</th>
                <th className="pr-9">Action</th>
              </tr>
            </thead>
            <tbody>
              {cardList.map((card) => (
                <tr key={card.id} className="text-center">
                  <td className="text-black font-bold">{card.name}</td>
                  <td className="text-black font-bold">{card.set}</td>
                  <td className="text-black font-bold">${card.market_price}</td>
                  <td>
                    <div className="flex gap-2 justify-center mr-4">
                      <IconButton onClick={() => handleEditCard(card)}>
                        <PencilSquareIcon className="h-5 w-5 cursor-pointer bg-blue-500 hover:bg-sky-800 active:border-b-0 active:translate-y-[4px] active:shadow-none transition-all" />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteCard(card.id)}>
                        <TrashIcon className="h-5 w-5 bg-red-500 hover:bg-red-800 cursor-pointer active:border-b-0 active:translate-y-[4px] active:shadow-none transition-all" />
                      </IconButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
