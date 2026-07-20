import { useState, useEffect } from "react";
import axios from "axios";
import ShopModal from "./ShopModal";
import ShopCard from "./ShopCard";

export default function ShopGrid() {
  const [shops, setShops] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedShop, setSelectedShop] = useState(null);

  const cities = ["Tokyo", "Osaka"];

  let selectedCityShops = selectedCity
    ? shops.filter((shop) => shop.city === selectedCity)
    : shops;

  useEffect(() => {
    const fetchShops = async () => {
      const response = await axios.get("/api/shops/getAllShops", {
        withCredentials: true,
      });
      setShops(response.data.shops);
    };
    fetchShops();
  }, []);

  const handleCity = (city) => {
    setSelectedCity(city);
  };

  const handleSelectedShop = (shop) => {
    setSelectedShop(shop);
  };

  const handleClose = () => {
    setSelectedShop(null);
  };
  return (
    <>
      <div
        className={`flex flex-row justify-center gap-2 ${selectedShop ? "blur-sm" : ""}`}
      >
        {cities.map((city) => (
          <button
            key={city}
            type="submit"
            className="rounded-md bg-white px-3 py-1.5 text-sm font-semibold text-red-500 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 cursor-pointer"
            onClick={() => handleCity(city)}
          >
            {city}
          </button>
        ))}
      </div>
      {selectedShop !== null ? (
        <ShopModal shop={selectedShop} onClose={handleClose} />
      ) : null}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 ${selectedShop ? "blur-sm" : ""}`}
      >
        {selectedCityShops.map((shop) => (
          <div key={shop.id} onClick={() => handleSelectedShop(shop)}>
            <ShopCard shop={shop} />
          </div>
        ))}
      </div>
    </>
  );
}
