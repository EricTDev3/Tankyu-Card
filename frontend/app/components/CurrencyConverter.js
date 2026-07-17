"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function CurrencyConverter() {
  const [rate, setRate] = useState(null);
  const [yen, setYen] = useState("");
  const [usd, setUsd] = useState("");

  useEffect(() => {
    const fetchRate = async () => {
      try {
        const data = await axios.get(
          "https://api.frankfurter.dev/v2/rates?base=USD&quotes=USD,JPY",
        );
        setRate(data.data[0].rate);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRate();
  }, []);

  const handleUSDConversion = (e) => {
    setUsd(e.target.value);

    if (e.target.value) {
      const value = Number(e.target.value) * rate;
      const formatValue = value % 1 !== 0 ? value.toFixed(2) : value;

      setYen(formatValue);
    }
  };

  const handleYenConversion = (e) => {
    setYen(e.target.value);

    if (e.target.value) {
      const value = Number(e.target.value) / rate;
      const formatValue = value % 1 !== 0 ? value.toFixed(2) : value;
      setUsd(formatValue);
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen  md:items-center items-center w-full px-6 md:px-12 py-12 bg-[#79a471] bg-[url('/images/currency.png')] bg-cover bg-center bg-no-repeat">
        <h1 className="flex justify-center text-[#105a37] text-6xl px-12 font-extrabold mb-4 font-hiro">
          Currency Converter
        </h1>
        <p className="mb-4 italic text-sm">
          Convert the card price or any products from Japanese yen to US dollars
          to make sure you&apos;re getting a good deal!
        </p>
        <div className="flex flex-col md:flex-row gap-8 justify-center border-4 border-solid border-[#1a652a] rounded-md mt-6 p-8">
          <div className="mr-2">
            <input
              type="number"
              placeholder="YEN"
              onChange={handleYenConversion}
              value={yen}
              className="block rounded-md w-48 bg-white px-3 py-1.5 text-base outline outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
            ></input>
            <label className="font-bold text-[#1a652a]">🇯🇵 Japanese Yen</label>
          </div>
          <div>
            <input
              type="number"
              placeholder="USD"
              onChange={handleUSDConversion}
              value={usd}
              className="block w-48 rounded-md bg-white px-3 py-1.5 text-base outline outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
            ></input>
            <label className="font-bold text-[#1a652a]">
              🇺🇸 United States Dollar
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
