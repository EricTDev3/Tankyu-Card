"use client";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Bars3Icon } from "@heroicons/react/24/solid";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <header className="md:hidden p-4">
        <Bars3Icon
          className="md:hidden h-8 w-8 cursor-pointer"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />
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
