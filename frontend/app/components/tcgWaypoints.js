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
                <ShopCard shop={shop} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
