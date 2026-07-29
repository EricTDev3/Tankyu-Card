import { useState, useEffect } from "react";
import ShopModal from "./ShopModal";
import ShopCard from "./ShopCard";

export default function ShopGrid({ shops }) {
  const [selectedShop, setSelectedShop] = useState(null);

  const handleSelectedShop = (shop) => {
    setSelectedShop(shop);
  };

  const handleClose = () => {
    setSelectedShop(null);
  };
  return (
    <>
      {selectedShop !== null ? (
        <ShopModal shop={selectedShop} onClose={handleClose} />
      ) : null}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 ${selectedShop ? "blur-sm" : ""}`}
      >
        {shops.map((shop) => (
          <div key={shop.id} onClick={() => handleSelectedShop(shop)}>
            <ShopCard shop={shop} />
          </div>
        ))}
      </div>
    </>
  );
}
