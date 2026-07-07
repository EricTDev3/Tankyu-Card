import { useState, useEffect } from "react";
import axios from "axios";

export default function ShopGrid() {
  const [shops, setShops] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  const cities = ["Tokyo", "Osaka"];
  let selectedCityShops = selectedCity
    ? shops.filter((shop) => shop.city === selectedCity)
    : shops;

  useEffect(() => {
    const fetchShops = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/shops/getAllShops`,
        { withCredentials: true },
      );
      setShops(response.data.shops);
    };
    fetchShops();
  }, []);

  const handleCity = (city) => {
    setSelectedCity(city);
    console.log(city);
  };

  return (
    <>
      <div className="flex flex-row justify-center gap-2">
        {cities.map((city) => (
          <button
            key={city}
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => handleCity(city)}
          >
            {city}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {selectedCityShops.map((shop) => (
          <div key={shop.id}>
            <a
              href="#"
              className="block border-2 border-black bg-white p-4 text-black shadow-[4px_4px_0_0] shadow-black hover:bg-yellow-200 focus:ring-2 focus:ring-yellow-300 focus:outline-0 sm:p-6"
            >
              <h3 className="mt-1 text-xl font-semibold">{shop.shop_name}</h3>

              <p className="mt-2 line-clamp-2 text-pretty">
                <span className="font-bold">Address:</span> {shop.address}
              </p>
              <p className="mt-2 line-clamp-2 text-pretty">
                <span className="font-bold">TCG Sets sold:</span>{" "}
                {shop.card_set_sold.map((set, index) =>
                  index === shop.card_set_sold.length - 1
                    ? `${set}`
                    : `${set}, `,
                )}
              </p>
            </a>
          </div>
        ))}
      </div>
    </>
  );
}
