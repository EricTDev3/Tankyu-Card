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
      <div className="md:flex md:items-stretch min-h-screen">
        <div
          className={`${isSidebarOpen ? "block" : "hidden"} md:block md:self-stretch`}
        >
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </div>
        <main className="flex-1 min-h-screen min-w-0">{children}</main>
      </div>
    </>
  );
}
