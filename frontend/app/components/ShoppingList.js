"use client";
import { useState, useEffect } from "react";
import ShoppingForm from "./ShoppingForm";
import axios from "axios";

export default function Dashboard() {
  const [token, setToken] = useState(null);
  const [cardList, setCardList] = useState([]);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const getCardsList = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/shoppingList/getCards`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      setCardList(response.data.shopping_list);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center bg-orange-400 h-screen">
        <ShoppingForm token={token} getCardsList={getCardsList} />
        <table className="table mx-auto w-auto">
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
                <td className="px-8">$ {card.market_price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
