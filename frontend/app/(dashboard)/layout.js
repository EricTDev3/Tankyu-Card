"use client";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Bars3Icon } from "@heroicons/react/24/solid";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <header className="flex flex-row justify-between md:hidden p-4 bg-rose-100">
        <Bars3Icon
          className="md:hidden h-8 w-8 cursor-pointer"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <h3 className="font-hiro text-pink-950">Tankyu Card</h3>
      </header>
      <div className="md:flex">
        <div className={`${isSidebarOpen ? "block" : "hidden"} md:block`}>
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </div>
        <main className="flex-1">{children}</main>
      </div>
    </>
  );
}
