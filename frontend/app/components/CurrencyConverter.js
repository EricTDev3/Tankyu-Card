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
      <div className="flex px-12 py-12">
        <div className="mr-2">
          <input
            type="number"
            placeholder="YEN"
            onChange={handleYenConversion}
            value={yen}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
          ></input>
          <label>Japanese Yen</label>
        </div>
        <div>
          <input
            type="number"
            placeholder="USD"
            onChange={handleUSDConversion}
            value={usd}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
          ></input>
          <label>United States Dollar</label>
        </div>
      </div>
    </>
  );
}
