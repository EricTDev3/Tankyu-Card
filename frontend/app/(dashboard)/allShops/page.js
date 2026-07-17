"use client";
import ShopGrid from "../../components/ShopGrid";

export default function ShopsPage() {
  return (
    <div className="flex">
      <div className="flex-1 bg-green-500">
        <h1 className="text-center bg-red-500">TCG Shops</h1>
        <ShopGrid />
      </div>
    </div>
  );
}
