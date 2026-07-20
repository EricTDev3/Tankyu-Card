"use client";

import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  ShoppingBagIcon,
  UserCircleIcon,
  CurrencyYenIcon,
  BuildingStorefrontIcon,
  BuildingOffice2Icon,
  PowerIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const router = useRouter();

  const handleLogout = async () => {
    await axios.post("/api/auth/logout", {}, { withCredentials: true });
    router.push("/");
  };

  return (
    <>
      <Card
        className={`${isSidebarOpen ? "block" : "hidden"} md:block fixed top-0 left-0 bottom-0 z-50 md:sticky md:top-0 md:z-auto h-screen w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 bg-yellow-300`}
      >
        <div className="mb-2 p-4">
          <XCircleIcon
            className="flex justify-self-end w-8 text-purple-600 cursor-pointer md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
          <Typography
            variant="h5"
            className="text-purple-600 text-2xl font-hiro"
          >
            TANKYU CARD
          </Typography>
        </div>
        <List>
          <ListItem
            className="mb-2 cursor-pointer hover:font-bold font-hiro"
            onClick={() => router.push("/allShops")}
          >
            <ListItemPrefix>
              <BuildingOffice2Icon className="h-5 w-5" />
            </ListItemPrefix>
            All Shops
          </ListItem>
          <ListItem
            className="mb-2 cursor-pointer hover:font-bold font-hiro"
            onClick={() => router.push("/tcgWaypoints")}
          >
            <ListItemPrefix>
              <BuildingStorefrontIcon className="h-5 w-5" />
            </ListItemPrefix>
            TCG Waypoints
          </ListItem>
          <ListItem
            className="mb-2 cursor-pointer hover:font-bold font-hiro"
            onClick={() => router.push("/shoppingList")}
          >
            <ListItemPrefix>
              <ShoppingBagIcon className="h-5 w-5" />
            </ListItemPrefix>
            Shopping List
          </ListItem>
          <ListItem
            className="mb-2 cursor-pointer hover:font-bold font-hiro"
            onClick={() => router.push("/currencyConverter")}
          >
            <ListItemPrefix>
              <CurrencyYenIcon className="h-5 w-5" />
            </ListItemPrefix>
            Currency Conversion Tool
          </ListItem>
          <ListItem className="mb-2 cursor-pointer hover:font-bold font-hiro">
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Profile
          </ListItem>
          <ListItem
            className="mb-2 cursor-pointer hover:font-bold font-hiro"
            onClick={handleLogout}
          >
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </Card>
    </>
  );
}
