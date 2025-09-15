import type React from "react";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Manrope } from "next/font/google";
import { Yuji_Boku } from "next/font/google";
import { Noto_Sans } from "next/font/google";
import { Sawarabi_Mincho } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

const yujiBoku = Yuji_Boku({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-yuji-boku",
});

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-noto-sans",
});

const sawarabiMincho = Sawarabi_Mincho({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-sawarabi-mincho",
});

export const metadata: Metadata = {
  title: "Akiko's Buddhist B&B - Hakalau, Hawaii",
  description:
    "A tranquil Buddhist bed and breakfast on the Hamakua Coast of Hawaii, offering spiritual retreat and natural beauty in authentic Hawaii.",
  generator: "v0.app",
  icons: {
    icon: "/AKIKOIcon.webp",
    shortcut: "/AKIKOIcon.webp",
    apple: "/AKIKOIcon.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${manrope.variable} ${yujiBoku.variable} ${notoSans.variable} ${sawarabiMincho.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
