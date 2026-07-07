"use client";
import ShopGrid from "../components/ShopGrid";
import Sidebar from "../components/Sidebar";

export default function ShopsPage() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-green-500">
        <h1 className="text-center bg-red-500">TCG Shops</h1>
        <ShopGrid />
      </div>
    </div>
  );
}
