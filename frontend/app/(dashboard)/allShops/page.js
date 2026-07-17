"use client";
import ShopGrid from "../../components/ShopGrid";

export default function ShopsPage() {
  return (
    <div className="flex">
      <div className="flex-1 bg-green-500">
        <h1 className="text-center font-hiro text-4xl mt-4 mb-4 underline underline-offset-8 decoration-red-500 text-white">
          TCG Shops
        </h1>
        <ShopGrid />
      </div>
    </div>
  );
}
