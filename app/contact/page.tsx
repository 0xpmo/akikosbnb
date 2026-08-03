import type { Metadata } from "next";
import ContactClient from "./contact-client";
import { BreadcrumbStructuredData } from "@/components/structured-data";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact & Booking — Hakalau, Hawaii",
  description:
    "Reserve a stay at Akiko's Buddhist Bed & Breakfast in Hakalau, Hawaii. Call Akiko at (808) 963-6422, email akikobandb@gmail.com, or send a booking inquiry with your preferred dates. 29-2091 Old Mamalahoa Hwy, Hakalau, HI 96710.",
  path: "/contact",
  image: "/og/contact.jpg",
  imageAlt:
    "The entrance to Akiko's Buddhist B&B on Old Mamalahoa Highway in Wailea Village, Hakalau, Hawaii",
  keywords: [
    "book Buddhist retreat Hawaii",
    "Hakalau bed and breakfast booking",
    "Akiko's Buddhist B&B phone number",
    "contact Big Island retreat",
    "reserve meditation retreat Hawaii",
  ],
});

export default function Page() {
  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />
      <ContactClient />
    </>
  );
}
