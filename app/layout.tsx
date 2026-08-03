import type React from "react";
import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Manrope } from "next/font/google";
import { Yuji_Boku } from "next/font/google";
import { Noto_Sans } from "next/font/google";
import { Sawarabi_Mincho } from "next/font/google";
import { BusinessStructuredData } from "@/components/structured-data";
import { BUSINESS, DEFAULT_OG_IMAGE, SITE_KEYWORDS, SITE_URL } from "@/lib/seo";
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
  // metadataBase turns every relative image/canonical path below into an
  // absolute URL, which is what crawlers and link previews require.
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Akiko's Buddhist B&B | Meditation & Yoga Retreat on Hawaii's Hamakua Coast",
    // Pages set a short title; this appends the brand automatically.
    template: "%s | Akiko's Buddhist B&B",
  },
  description:
    "A Buddhist bed & breakfast and retreat on the Hamakua Coast of Hawaii, 15 miles north of Hilo. Zazen meditation, yoga and tai chi, quiet rainforest cottages, hiking and waterfalls on two acres of tropical gardens.",
  keywords: SITE_KEYWORDS,
  applicationName: BUSINESS.shortName,
  authors: [{ name: BUSINESS.name, url: SITE_URL }],
  creator: BUSINESS.name,
  publisher: BUSINESS.name,
  category: "Travel",
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: BUSINESS.shortName,
    title:
      "Akiko's Buddhist B&B | Meditation & Yoga Retreat on Hawaii's Hamakua Coast",
    description:
      "A Buddhist bed & breakfast and retreat on the Hamakua Coast of Hawaii, 15 miles north of Hilo. Zazen meditation, yoga, rainforest cottages and two acres of tropical gardens.",
    locale: "en_US",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Akiko's Buddhist B&B | Meditation & Yoga Retreat in Hawaii",
    description:
      "Zazen meditation, yoga and quiet rainforest cottages on the Hamakua Coast of Hawaii, 15 miles north of Hilo.",
    images: [DEFAULT_OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: true, address: true },
  icons: {
    icon: "/AKIKOIcon.webp",
    shortcut: "/AKIKOIcon.webp",
    apple: "/AKIKOIcon.webp",
  },
  other: {
    // Legacy geo tags. Cheap to include and still read by some local
    // directories and aggregators that scrape B&B listings.
    "geo.region": "US-HI",
    "geo.placename": "Hakalau, Hawaii",
    "geo.position": `${BUSINESS.latitude};${BUSINESS.longitude}`,
    ICBM: `${BUSINESS.latitude}, ${BUSINESS.longitude}`,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#153025",
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
      <head>
        {/*
          There used to be a block of <link rel="preload"> tags here for the
          hero video and four images. They were doing the opposite of their
          intent: this layout wraps every route, so all eight pages were
          downloading a 2 MB homepage video plus the full-size originals of
          images that next/image never requests (it serves /_next/image
          variants instead), which the browser then discarded unused. The
          images that genuinely matter already carry `priority`, and next/image
          emits the correct preload for those on its own.
        */}
        <BusinessStructuredData />
      </head>
      <body>{children}</body>
    </html>
  );
}
