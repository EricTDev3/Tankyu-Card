"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CardSearch from "./CardSearch";
import * as yup from "yup";
import axios from "axios";

const schema = yup
  .object({
    cardName: yup.string().required("Card name is required"),
    set: yup.string().required("Set name is required"),
    marketPrice: yup.number().positive("Price must be positive").required(),
  })
  .required();

export default function ShoppingForm({ getCardsList }) {
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [selectedCardImage, setSelectedCardImage] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    getCardsList();
  }, []);

  const handleFormSubmit = async (data) => {
    try {
      const response = await axios.post(
        "/api/shoppingList/addCard",
        {
          name: data.cardName,
          set: data.set,
          marketPrice: data.marketPrice,
          cardId: selectedCardId,
          cardImage: selectedCardImage,
        },
        { withCredentials: true },
      );

      getCardsList();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      action="#"
      method="POST"
      className="flex flex-col md:flex-row gap-4 items-start md:items-end mt-10 w-full md:w-max"
    >
      <div className="w-auto">
        <div className="mt-2">
          <CardSearch
            setValue={setValue}
            setSelectedCardId={setSelectedCardId}
            setSelectedCardImage={setSelectedCardImage}
          />
        </div>
      </div>

      <div className="w-48">
        <div className="mt-2">
          <input
            id="set"
            name="set"
            type="text"
            {...register("set", { required: true })}
            placeholder="set name"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
          />
        </div>
      </div>

      <div className="w-48">
        <div className="mt-2">
          <input
            id="marketPrice"
            name="marketPrice"
            type="number"
            placeholder="market price"
            {...register("marketPrice", { required: true })}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="flex rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
        >
          Add To List
        </button>
      </div>
    </form>
  );
}
