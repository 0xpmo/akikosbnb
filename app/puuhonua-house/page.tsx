import type { Metadata } from "next";
import PuuhonuaHouseClient from "./puuhonua-house-client";
import {
  ACCOMMODATIONS,
  AccommodationStructuredData,
  BreadcrumbStructuredData,
} from "@/components/structured-data";
import { pageMetadata } from "@/lib/seo";

const room = ACCOMMODATIONS.find((a) => a.path === "/puuhonua-house")!;

export const metadata: Metadata = pageMetadata({
  title: "Pu'uhonua House — Plantation Home Rooms",
  description:
    "Pu'uhonua means sanctuary. Private bedrooms — Sunrise, Elegant Tree Tops and Rainforest — in a classic old Hawaiian plantation house with a shared kitchen, library and garden veranda. From $75/night, 7 night minimum.",
  path: "/puuhonua-house",
  image: "/og/puuhonua-house.jpg",
  imageAlt:
    "The Pu'uhonua House, a two-story Hawaiian plantation home with veranda, at Akiko's Buddhist B&B in Hakalau",
  keywords: [
    "plantation house stay Big Island",
    "shared house retreat Hawaii",
    "community retreat Big Island",
    "private room bed and breakfast Hakalau",
    "old Hawaii lodging Hamakua Coast",
    "Buddhist retreat rooms Hawaii",
    "solo traveler lodging Big Island",
  ],
});

export default function Page() {
  return (
    <>
      <AccommodationStructuredData room={room} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", path: "/" },
          { name: "Pu'uhonua House", path: "/puuhonua-house" },
        ]}
      />
      <PuuhonuaHouseClient />
    </>
  );
}
