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
  PowerIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = async () => {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
      {},
      { withCredentials: true },
    );
    router.push("/");
  };

  return (
    <Card className="h-screen w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray" className="text-purple-600">
          TANKYU CARD
        </Typography>
      </div>
      <List>
        <ListItem className="mb-2">
          <ListItemPrefix>
            <BuildingStorefrontIcon className="h-5 w-5" />
          </ListItemPrefix>
          Must Visit
        </ListItem>
        <ListItem className="mb-2">
          <ListItemPrefix>
            <ShoppingBagIcon className="h-5 w-5" />
          </ListItemPrefix>
          Shopping List
        </ListItem>
        <ListItem className="mb-2">
          <ListItemPrefix>
            <CurrencyYenIcon className="h-5 w-5" />
          </ListItemPrefix>
          Currency Conversion Tool
        </ListItem>
        <ListItem className="mb-2">
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>
        <ListItem className="mb-2" onClick={handleLogout}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}
