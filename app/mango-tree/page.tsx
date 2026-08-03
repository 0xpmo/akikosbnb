import type { Metadata } from "next";
import MangoTreeClient from "./mango-tree-client";
import {
  ACCOMMODATIONS,
  AccommodationStructuredData,
  BreadcrumbStructuredData,
} from "@/components/structured-data";
import { pageMetadata } from "@/lib/seo";

const room = ACCOMMODATIONS.find((a) => a.path === "/mango-tree")!;

export const metadata: Metadata = pageMetadata({
  title: "Mango Tree Cottage — Open-Air Rainforest Studio",
  description:
    "A 16x24 screened studio open to the Hawaiian rainforest beneath a giant mango tree. Queen bed, work table, shared kitchen and bath, WiFi. Sleeps one or two. From $85/night, 7 night minimum.",
  path: "/mango-tree",
  image: "/og/mango-tree.jpg",
  imageAlt:
    "The screened Mango Tree Cottage beneath a giant mango tree at Akiko's Buddhist B&B on the Hamakua Coast of Hawaii",
  keywords: [
    "open air cottage Hawaii",
    "screened studio Big Island",
    "rainforest cabin Hamakua Coast",
    "couples retreat Big Island",
    "nature immersion stay Hawaii",
    "jungle cottage Hilo Hawaii",
    "meditation retreat lodging Hawaii",
  ],
});

export default function Page() {
  return (
    <>
      <AccommodationStructuredData room={room} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", path: "/" },
          { name: "Mango Tree Cottage", path: "/mango-tree" },
        ]}
      />
      <MangoTreeClient />
    </>
  );
}
