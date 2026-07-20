"use client";
import ShopGrid from "../../components/ShopGrid";

export default function ShopsPage() {
  return (
    <div className="flex">
      <div className="flex-1 min-h-screen bg-[url('/images/shopsBackground.png')] bg-cover bg-center bg-no-repeat">
        <h1 className="text-center font-hiro text-4xl mt-4 mb-4 underline underline-offset-8 text-red-900 ">
          TCG Shops
        </h1>
        <ShopGrid />
      </div>
    </div>
  );
}
