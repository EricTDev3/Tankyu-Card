"use client";
import { useState } from "react";
import axios from "axios";

export default function CardSearch({
  fillCardFields,
  setSelectedCardId,
  setSelectedCardImage,
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/shoppingList/getCardInfo", {
        params: { q: query },
      });
      setResults(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-auto">
      <div className="flex flex-row items-stretch gap-2 md:flex-row-reverse">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSearch();
            }
          }}
          placeholder="search cards"
          className="block w-48 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
        />
        <button
          type="button"
          onClick={handleSearch}
          disabled={loading}
          className="shrink-0 rounded-md bg-purple-700 px-3 py-1.5 text-sm font-hiro font-semibold text-yellow-300 shadow-sm outline outline-1 outline-yellow-400 hover:bg-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400 cursor-pointer disabled:opacity-70 disabled:cursor-wait"
        >
          {loading ? "..." : "Search"}
        </button>
      </div>

      {results.length > 0 && (
        <div className="absolute left-0 top-full z-50 mt-1 max-h-80 w-max max-w-xs overflow-y-auto rounded-md bg-white shadow-lg outline outline-1 outline-gray-600">
          {results.map((card) => (
            <div
              key={card.id}
              onClick={() => {
                fillCardFields(
                  card.name,
                  card.segmentName || card.setName || card.releaseName || "",
                );
                setSelectedCardId(card.id);
                setSelectedCardImage(card.image?.data ?? null);
                setResults([]);
              }}
              className="flex cursor-pointer items-center gap-2 px-2 py-1.5 hover:bg-gray-100"
            >
              {card.image != null && (
                <img
                  src={card.image.data}
                  alt={card.name}
                  className="h-16 w-12 shrink-0 object-cover rounded"
                />
              )}
              <div>
                <p className="text-sm font-semibold text-gray-900">{card.name}</p>
                <p className="text-xs text-gray-600">{card.segmentName}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
