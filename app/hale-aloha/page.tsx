import type { Metadata } from "next";
import HaleAlohaClient from "./hale-aloha-client";
import {
  ACCOMMODATIONS,
  AccommodationStructuredData,
  BreadcrumbStructuredData,
} from "@/components/structured-data";
import { pageMetadata } from "@/lib/seo";

const room = ACCOMMODATIONS.find((a) => a.path === "/hale-aloha")!;

export const metadata: Metadata = pageMetadata({
  title: "Hale Aloha — Private 3-Bedroom Retreat Home",
  description:
    "A gracious three-bedroom, 1.5-bath plantation-style home on the Hamakua Coast, with a full kitchen cooled by trade winds and picture windows onto flowers and fruit trees. Sleeps four. From $150/night; monthly stays welcome.",
  path: "/hale-aloha",
  image: "/og/hale-aloha.jpg",
  imageAlt:
    "Exterior of Hale Aloha, a plantation-style vacation home surrounded by tropical flowers in Hakalau, Hawaii",
  keywords: [
    "Big Island vacation rental family",
    "3 bedroom house rental Hamakua Coast",
    "monthly rental Big Island Hawaii",
    "private home retreat Hawaii",
    "group retreat house Big Island",
    "plantation home rental Hakalau",
    "long term stay near Hilo",
  ],
});

export default function Page() {
  return (
    <>
      <AccommodationStructuredData room={room} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", path: "/" },
          { name: "Hale Aloha", path: "/hale-aloha" },
        ]}
      />
      <HaleAlohaClient />
    </>
  );
}
