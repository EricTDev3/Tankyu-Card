"use client";
import { useState } from "react";
import ShoppingForm from "./ShoppingForm";
import Sidebar from "./Sidebar";
import axios from "axios";

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
            </tr>
          </thead>
          <tbody>
            {cardList.map((card) => (
              <tr key={card.id}>
                <td className="px-8">{card.name}</td>
                <td className="px-8">{card.set}</td>
                <td className="px-8">${card.market_price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
