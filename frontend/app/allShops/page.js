"use client";
import ShopGrid from "../components/ShopGrid";
import Sidebar from "../components/Sidebar";

export default function ShopsPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <ShopGrid />
    </div>
  );
}
