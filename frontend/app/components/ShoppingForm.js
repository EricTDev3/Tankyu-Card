"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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
  const {
    register,
    handleSubmit,
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
        { name: data.cardName, set: data.set, marketPrice: data.marketPrice },
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
      className="flex flex-col md:flex-row gap-4 md:items-end mt-10 items-start"
    >
      <div className="w-full md:w-auto ml-2">
        <div className="mt-2">
          <input
            id="cardName"
            name="cardName"
            type="text"
            {...register("cardName", { required: true })}
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
            {...register("set", { required: true })}
            placeholder="set name"
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
            {...register("marketPrice", { required: true })}
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
