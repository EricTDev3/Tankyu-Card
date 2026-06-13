"use client";
import { useState, useEffect } from "react";
import CurrencyConverter from "./CurrencyConverter";
import axios from "axios";

export default function ShoppingForm({ token, getCardsList }) {
  const [name, setName] = useState("");
  const [set, setSet] = useState("");
  const [marketPrice, setMarketPrice] = useState("");

  useEffect(() => {
    if (!token) return;
    getCardsList();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/shoppingList/addCard`,
        { name, set, marketPrice },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      setName("");
      setSet("");
      setMarketPrice("");

      getCardsList();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-start justify-center px-12 py-12 ">
      <form
        onSubmit={handleSubmit}
        action="#"
        method="POST"
        className="mt-10  flex gap-4 items-end"
      >
        <div>
          <div className="mt-2">
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="card name"
              required
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <div className="mt-2">
            <input
              id="set"
              name="set"
              type="text"
              value={set}
              placeholder="set name"
              onChange={(e) => setSet(e.target.value)}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <div className="mt-2">
            <input
              id="marketPrice"
              name="marketPrice"
              type="number"
              placeholder="market price"
              value={marketPrice}
              onChange={(e) => setMarketPrice(e.target.value)}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add To Shopping List
          </button>
        </div>
      </form>
      <CurrencyConverter />
    </div>
  );
}
