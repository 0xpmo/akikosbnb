import type { Metadata } from "next";
import BananaPatchClient from "./banana-patch-client";
import {
  ACCOMMODATIONS,
  AccommodationStructuredData,
  BreadcrumbStructuredData,
} from "@/components/structured-data";
import { pageMetadata } from "@/lib/seo";

const room = ACCOMMODATIONS.find((a) => a.path === "/banana-patch")!;

export const metadata: Metadata = pageMetadata({
  title: "Banana Patch Cottage — Solo Retreat Cabin in Hakalau, Hawaii",
  description:
    "A 12x12 solo retreat cottage tucked into a banana grove on Hawaii's Hamakua Coast. Bamboo bed, reading chair, shared kitchen and bath, WiFi, and daily zazen and yoga. From $75/night, 7 night minimum.",
  path: "/banana-patch",
  image: "/og/banana-patch.jpg",
  imageAlt:
    "Exterior of the Banana Patch Cottage surrounded by banana trees at Akiko's Buddhist B&B in Hakalau, Hawaii",
  keywords: [
    "solo retreat cabin Hawaii",
    "meditation cabin Big Island",
    "affordable Big Island lodging",
    "rainforest cottage Hakalau",
    "personal retreat Hawaii",
    "silent retreat cottage Hawaii",
    "budget bed and breakfast Hilo Hawaii",
  ],
});

export default function Page() {
  return (
    <>
      <AccommodationStructuredData room={room} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", path: "/" },
          { name: "Banana Patch Cottage", path: "/banana-patch" },
        ]}
      />
      <BananaPatchClient />
    </>
  );
}
