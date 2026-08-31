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
    <div className="flex min-h-screen min-w-0 w-full bg-[url('/images/cardShops.png')] bg-[length:100%_100%] bg-no-repeat">
      <div className="flex flex-col mt-50 md:mt-48 md:ml-30 items-start md:items-center flex-1 min-w-0 w-full px-2 md:px-0">
        {editClicked && (
          <CardEditingModal
            formData={formData}
            setFormData={setFormData}
            setEditClicked={setEditClicked}
            selectedCard={selectedCard}
            getCardsList={getCardsList}
          />
        )}
        <div className="w-full min-w-0 md:inline-flex md:w-auto md:flex-col md:items-stretch">
          <ShoppingForm getCardsList={getCardsList} />
          <div className="w-full mt-4 md:w-0 md:min-w-full bg-[url('/images/woodenBoard.png')] bg-cover bg-center bg-no-repeat rounded-lg p-2 md:p-4 overflow-x-auto">
          <table className="table table-xs md:table-sm w-full table-fixed">
            <thead>
              <tr className="text-white text-center">
                <th className="p-1 md:px-3 md:py-2"></th>
                <th className="p-1 md:px-3 md:py-2 leading-tight">Name</th>
                <th className="p-1 md:px-3 md:py-2 leading-tight">Set</th>
                <th className="p-1 md:px-3 md:py-2 leading-tight whitespace-normal">
                  <span className="md:hidden">Price</span>
                  <span className="hidden md:inline">Market Price</span>
                </th>
                <th className="p-1 md:px-3 md:py-2 leading-tight">Action</th>
              </tr>
            </thead>
            <tbody>
              {cardList.map((card) => (
                <tr key={card.id} className="text-center">
                  <td className="p-1 md:px-3 md:py-2 text-black font-bold">
                    <img
                      src={card.card_image}
                      alt="card image"
                      className="w-8 h-11 md:w-14 md:h-20 object-cover mx-auto"
                    />
                  </td>
                  <td className="p-1 md:px-3 md:py-2 text-black font-bold break-words">
                    {card.name}
                  </td>
                  <td className="p-1 md:px-3 md:py-2 text-black font-bold break-words">
                    {card.set}
                  </td>
                  <td className="p-1 md:px-3 md:py-2 text-black font-bold break-words">
                    {card.market_price}
                  </td>
                  <td className="p-1 md:px-3 md:py-2">
                    <div className="flex gap-1 md:gap-2 justify-center items-center">
                      <IconButton
                        onClick={() => handleEditCard(card)}
                        className="flex !h-6 !w-6 !min-h-6 !min-w-6 !p-0 md:!h-8 md:!w-8 md:!min-h-8 md:!min-w-8 items-center justify-center rounded"
                      >
                        <PencilSquareIcon className="h-4 w-4 md:h-5 md:w-5 cursor-pointer bg-blue-500 hover:bg-sky-800 active:border-b-0 active:translate-y-[4px] active:shadow-none transition-all" />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteCard(card.id)}
                        className="flex !h-6 !w-6 !min-h-6 !min-w-6 !p-0 md:!h-8 md:!w-8 md:!min-h-8 md:!min-w-8 items-center justify-center rounded"
                      >
                        <TrashIcon className="h-4 w-4 md:h-5 md:w-5 bg-red-500 hover:bg-red-800 cursor-pointer active:border-b-0 active:translate-y-[4px] active:shadow-none transition-all" />
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
    </div>
  );
}
