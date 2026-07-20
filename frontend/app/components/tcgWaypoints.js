import { useState, useEffect } from "react";
import axios from "axios";
import ShopCard from "./ShopCard";

export default function MustVisitShops() {
  const [savedShops, setSavedShops] = useState([]);

  useEffect(() => {
    const fetchSavedShops = async () => {
      const response = await axios.get("/api/shops/getSavedShops", {
        withCredentials: true,
      });
      setSavedShops(response.data.shopData);
    };
    fetchSavedShops();
  }, []);

  const handleRemoveShop = async (shopId) => {
    const response = await axios.delete("/api/shops/deleteSavedShop", {
      withCredentials: true,
      data: { shopId },
    });
    const filteredShops = savedShops.filter((shop) => shop.shop_id !== shopId);
    setSavedShops(filteredShops);
  };

  return (
    <>
      <div className="flex min-h-screen bg-[url('/images/shopsToVisit.png')] bg-cover bg-no-repeat">
        <div className="flex flex-1 flex-col">
          <h1
            className="text-center font-hiro text-5xl
          font-bold
          bg-gradient-to-r
          from-red-500
          via-yellow-300
          via-green-300
          via-cyan-300
          via-blue-400
          via-purple-400
          to-pink-400
          bg-clip-text
          text-transparent
          drop-shadow-[0_0_8px_rgba(255,255,255,0.35)] mt-10"
          >
            TCG WAYPOINTS
          </h1>

          {savedShops && savedShops.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3">
              {savedShops.map((shop) => (
                <div key={shop.id}>
                  <ShopCard
                    shop={shop}
                    action={
                      <button
                        className="flex cursor-pointer justify-self-end self-end rounded-full bg-red-900 px-5 py-2 font-medium text-white shadow-md transition-all hover:bg-red-700 hover:shadow-lg"
                        onClick={() => handleRemoveShop(shop.id)}
                      >
                        Remove Shop
                      </button>
                    }
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-1 items-center justify-center">
              <p className="text-center text-yellow-500">
                Please add shops to the list via the All Shops tab
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
