import type { Metadata } from "next";
import ReviewsClient from "./reviews-client";
import { BreadcrumbStructuredData } from "@/components/structured-data";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Guest Reflections & Reviews",
  description:
    "Read what guests say about staying at Akiko's Buddhist Bed & Breakfast on the Hamakua Coast: the quiet of old Hawaii, the zendo and gardens, and the friendships formed during meditation and yoga retreats.",
  path: "/reviews",
  image: "/og/reviews.jpg",
  imageAlt:
    "Stone Buddha statues in the gardens at Akiko's Buddhist B&B in Hakalau, Hawaii",
  keywords: [
    "Akiko's Buddhist B&B reviews",
    "Hawaii retreat reviews",
    "Big Island bed and breakfast reviews",
    "meditation retreat testimonials Hawaii",
    "Hamakua Coast lodging reviews",
  ],
});

export default function Page() {
  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: "Home", path: "/" },
          { name: "Guest Reflections", path: "/reviews" },
        ]}
      />
      <ReviewsClient />
    </>
  );
}
