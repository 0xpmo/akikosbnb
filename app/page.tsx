import type { Metadata } from "next";
import HomeClient from "./home-client";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title:
    "Akiko's Buddhist B&B | Meditation & Yoga Retreat on Hawaii's Hamakua Coast",
  absoluteTitle: true,
  description:
    "A Buddhist bed & breakfast and meditation retreat on the Hamakua Coast of Hawaii, 15 miles north of Hilo. Zazen, yoga and tai chi, quiet rainforest cottages, waterfalls and hiking on two acres of tropical gardens in Hakalau.",
  path: "/",
});

export default function Page() {
  return <HomeClient />;
}
