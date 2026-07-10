"use client";
import { useState } from "react";
import ShoppingForm from "./ShoppingForm";
import Sidebar from "./Sidebar";
import axios from "axios";
import { IconButton } from "@material-tailwind/react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

export default function ShoppingList() {
  const [cardList, setCardList] = useState([]);

  const getCardsList = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/shoppingList/getCards`,
        { withCredentials: true },
      );
      setCardList(response.data.shopping_list);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col items-center flex-1 min-h-screen overflow-y-auto">
        <ShoppingForm getCardsList={getCardsList} />
        <table className="table mx-auto w-auto bg-gray-200">
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
                  <IconButton>
                    <PencilSquareIcon className="h-5 w-5 cursor-pointer bg-blue-500 hover:bg-sky-800 active:border-b-0 active:translate-y-[4px] active:shadow-none transition-all" />
                  </IconButton>
                  <IconButton>
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
