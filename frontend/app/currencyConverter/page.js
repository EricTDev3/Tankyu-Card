"use client";
import CurrencyConverter from "../components/CurrencyConverter";
import Sidebar from "../components/Sidebar";

export default function CurrencyConverterPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <CurrencyConverter />
    </div>
  );
}
