import type { Metadata } from "next";
import FacilitiesClient from "./facilities-client";
import { BreadcrumbStructuredData } from "@/components/structured-data";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Zendo, Yoga Studio & Two-Acre Grounds",
  description:
    "Our zendo hosts zazen meditation Wednesday and Friday evenings, and the yoga studio holds restorative yoga Monday and Thursday. Two acres of tropical gardens, citrus orchard and breadfruit grove on the Hamakua Coast.",
  path: "/facilities",
  image: "/og/facilities.jpg",
  imageAlt:
    "Inside the zendo meditation hall at Akiko's Buddhist B&B in Hakalau, Hawaii",
  keywords: [
    "zendo Hawaii",
    "zazen meditation Big Island",
    "yoga studio Hamakua Coast",
    "meditation hall Hawaii",
    "tai chi classes Hakalau",
    "Buddhist temple Big Island",
    "drop in meditation near Hilo",
    "tropical gardens Big Island",
  ],
});

export default function Page() {
  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: "Home", path: "/" },
          { name: "Amenities", path: "/facilities" },
        ]}
      />
      <FacilitiesClient />
    </>
  );
}
