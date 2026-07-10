import { useState, useEffect } from "react";
import axios from "axios";
import ShopCard from "./ShopCard";
import Sidebar from "./Sidebar";

export default function MustVisitShops() {
  const [savedShops, setSavedShops] = useState([]);

  useEffect(() => {
    const fetchSavedShops = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/shops/getSavedShops`,
        { withCredentials: true },
      );
      setSavedShops(response.data.shopData);
    };
    fetchSavedShops();
  }, []);

  const handleRemove = async (shopId) => {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/shops/deleteSavedShop`,
      { withCredentials: true, data: { shopId } },
    );
    const filteredShops = savedShops.filter((shop) => shop.shop_id !== shopId);
    setSavedShops(filteredShops);
  };

  return (
    <>
      <div className="flex bg-blue-500">
        <Sidebar />
        <div className="flex-1 flex-col">
          <h1 className="bg-green-200 text-center">TCG WAYPOINTS</h1>
          <div
            className={
              "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 mt-6"
            }
          >
            {savedShops.map((shop) => (
              <div key={shop.id}>
                <ShopCard
                  shop={shop}
                  action={
                    <button
                      className="flex justify-self-end rounded-full w-8 h-8 items-center cursor-pointer justify-center border border-indigo-600 bg-indigo-600 text-white shadow-sm transition-colors hover:bg-indigo-400 focus-visible:ring-4 focus-visible:ring-indigo-100 focus-visible:outline-none"
                      onClick={() => handleRemove(shop.id)}
                    >
                      -
                    </button>
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
