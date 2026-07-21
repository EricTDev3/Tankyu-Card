"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ShoppingForm({ getCardsList }) {
  const [name, setName] = useState("");
  const [set, setSet] = useState("");
  const [marketPrice, setMarketPrice] = useState("");

  useEffect(() => {
    getCardsList();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/api/shoppingList/addCard",
        { name, set, marketPrice },
        { withCredentials: true },
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
    <form
      onSubmit={handleSubmit}
      action="#"
      method="POST"
      className="flex flex-col md:flex-row gap-4 md:items-end mt-10 items-start"
    >
      <div className="w-full md:w-auto ml-2">
        <div className="mt-2">
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="card name"
            required
            className="block w-full md:w-48 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
          />
        </div>
      </div>

      <div className="w-full md:w-auto ml-2">
        <div className="mt-2">
          <input
            id="set"
            name="set"
            type="text"
            value={set}
            placeholder="set name"
            onChange={(e) => setSet(e.target.value)}
            className="block w-full md:w-48 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
          />
        </div>
      </div>

      <div className="w-full md:w-auto ml-2">
        <div className="mt-2">
          <input
            id="marketPrice"
            name="marketPrice"
            type="number"
            placeholder="market price"
            value={marketPrice}
            onChange={(e) => setMarketPrice(e.target.value)}
            className="block w-full md:w-48 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="flex ml-2 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
        >
          Add To List
        </button>
      </div>
    </form>
  );
}
