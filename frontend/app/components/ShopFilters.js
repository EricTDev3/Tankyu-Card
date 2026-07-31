"use client";
import { useState, useRef, useEffect } from "react";

export default function ShopFilters({ onApplyFilters }) {
  const [filters, setFilters] = useState({
    city: "",
    neighborhood: "",
    tcgSet: "",
  });

  const [isOpen, setIsOpen] = useState({
    city: false,
    neighborhood: false,
    tcgSet: false,
  });

  const cityOptions = ["Tokyo", "Osaka"];
  const neighborhoodOptions = [
    "Namba",
    "Nipponbashi",
    "Amemura",
    "Umeda",
    "Chiyoda",
    "Shinjuku",
    "Akihabara",
    "Ikebukuro",
  ];
  const tcgSetOptions = [
    "Pokemon",
    "One Piece",
    "Yugioh",
    "Digimon",
    "Dual Masters",
    "Magic The Gathering",
  ];

  const handleFilterUpdate = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };

  const handleToggleDropDown = (filterOption) => {
    setIsOpen({ ...isOpen, [filterOption]: !isOpen[filterOption] });
  };

  const filterRef = useRef();
  // close filters if click outside of filter
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!filterRef.current.contains(event.target)) {
        setIsOpen({
          city: false,
          neighborhood: false,
          tcgSet: false,
        });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        className="flex flex-col md:flex-row justify-center w-full mx-auto gap-2 ml-2"
        ref={filterRef}
      >
        <div className="relative">
          <button
            onClick={() => handleToggleDropDown("city")}
            className="cursor-pointer w-32 ml-4 rounded-md bg-red-900 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-pink-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
          >
            {filters.city !== "" ? filters.city : "City"}
          </button>
          <div className="absolute left-0 top-full ml-4 mt-2 w-32 rounded-md shadow-lg z-50">
            {isOpen.city &&
              cityOptions.map((city) => (
                <label
                  key={city}
                  onClick={() => {
                    handleFilterUpdate("city", city);
                    handleToggleDropDown("city");
                  }}
                  className="flex flex-col cursor-pointer text-center hover:bg-pink-200 z-50 bg-red-100 text-red-900"
                >
                  {city}
                </label>
              ))}
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => handleToggleDropDown("neighborhood")}
            className="cursor-pointer w-32 ml-4 rounded-md bg-red-900 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-pink-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
          >
            {filters.neighborhood ? filters.neighborhood : "Neighborhood"}
          </button>
          <div className="absolute left-0 top-full mt-2 ml-4 w-30 rounded-md shadow-lg z-50">
            {isOpen.neighborhood &&
              neighborhoodOptions.map((neighborhood) => (
                <label
                  key={neighborhood}
                  onClick={() => {
                    handleFilterUpdate("neighborhood", neighborhood);
                    handleToggleDropDown("neighborhood");
                  }}
                  className="flex flex-col cursor-pointer text-center ml-1 hover:bg-pink-200 z-50 bg-red-100 text-red-900"
                >
                  {neighborhood}
                </label>
              ))}
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => handleToggleDropDown("tcgSet")}
            className="cursor-pointer w-32 ml-4 rounded-md bg-red-900 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-pink-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
          >
            {filters.tcgSet ? filters.tcgSet : "TCG Set"}
          </button>
          <div className="absolute left-0 top-full mt-1 ml-5 w-30 rounded-md shadow-lg z-50">
            {isOpen.tcgSet &&
              tcgSetOptions.map((tcgSet) => (
                <label
                  key={tcgSet}
                  onClick={() => {
                    handleFilterUpdate("tcgSet", tcgSet);
                    handleToggleDropDown("tcgSet");
                  }}
                  className="flex flex-col cursor-pointer text-center hover:bg-pink-200 z-50 bg-red-100 text-red-900"
                >
                  {tcgSet}
                </label>
              ))}
          </div>
        </div>
        <button
          onClick={() => onApplyFilters(filters)}
          className="cursor-pointer w-32 ml-4 rounded-md bg-yellow-500 px-3 py-1.5 text-sm font-semibold text-red-900 shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
        >
          Filter
        </button>
        <button
          onClick={() => {
            (onApplyFilters({ city: "", neighborhood: "", tcgSet: "" }),
              setFilters({ city: "", neighborhood: "", tcgSet: "" }));
          }}
          className="cursor-pointer w-32 ml-4 rounded-md bg-gray-500 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
        >
          Clear Filters
        </button>
      </div>
    </>
  );
}
