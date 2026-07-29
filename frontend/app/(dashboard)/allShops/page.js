"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import ShopGrid from "../../components/ShopGrid";
import ShopFilters from "../../components/ShopFilters";

export default function ShopsPage() {
  const [shops, setShops] = useState([]);
  const [filters, setFilters] = useState({
    city: "",
    neighborhood: "",
    tcgSet: "",
  });

  useEffect(() => {
    const fetchShops = async () => {
      const response = await axios.get("/api/shops/getAllShops", {
        withCredentials: true,
      });
      setShops(response.data.shops);
    };
    fetchShops();
  }, []);

  const filteredShops = shops.filter((shop) => {
    const cityMatch = filters.city === "" || shop.city === filters.city;
    const neighborhoodMatch =
      filters.neighborhood === "" || shop.neighborhood === filters.neighborhood;
    const tcgSetMatch =
      filters.tcgSet === "" || shop.card_set_sold.includes(filters.tcgSet);

    return cityMatch && neighborhoodMatch && tcgSetMatch;
  });

  const handleAppliedFilters = (selectedFilters) => {
    setFilters(selectedFilters);
  };

  return (
    <div className="flex border">
      <div className="flex-1 min-h-screen bg-[url('/images/shopsBackground.png')] bg-fixed bg-cover bg-center bg-no-repeat">
        <h1 className="text-center font-hiro text-4xl mt-4 mb-4 underline underline-offset-8 text-red-900">
          TCG Shops
        </h1>
        <ShopFilters onApplyFilters={handleAppliedFilters} />
        <ShopGrid shops={filteredShops} />
      </div>
    </div>
  );
}
