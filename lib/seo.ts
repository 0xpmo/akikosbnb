/**
 * Central SEO configuration.
 *
 * Everything search engines read about the business lives here so the name,
 * address and phone (NAP) stay identical across page metadata, structured data
 * and the visible page content. Search engines treat inconsistent NAP data as a
 * signal that a listing may be untrustworthy, so change it in one place only.
 */

export const SITE_URL = "https://www.akikosbnb.com";

export const BUSINESS = {
  name: "Akiko's Buddhist Bed & Breakfast",
  shortName: "Akiko's Buddhist B&B",
  legalName: "Akiko's Buddhist Bed & Breakfast",
  email: "akikobandb@gmail.com",
  phone: "+1-808-963-6422",
  phoneDisplay: "(808) 963-6422",
  streetAddress: "29-2091 Old Mamalahoa Hwy",
  addressLocality: "Hakalau",
  addressRegion: "HI",
  postalCode: "96710",
  addressCountry: "US",
  // Approximate coordinates for Hakalau / Wailea Village. Replace with the
  // exact pin from the Google Business Profile if it differs.
  latitude: 19.8994,
  longitude: -155.1231,
  priceRange: "$75-$150",
} as const;

export const BUSINESS_ADDRESS_ONE_LINE = `${BUSINESS.streetAddress}, ${BUSINESS.addressLocality}, ${BUSINESS.addressRegion} ${BUSINESS.postalCode}`;

/**
 * Keyword themes. Google ignores the `keywords` meta tag, but these same
 * phrases are worked into the titles, descriptions, headings and body copy of
 * each page, which is what actually ranks. Keeping them listed here makes it
 * obvious what each page is meant to be found for.
 */
export const SITE_KEYWORDS = [
  "Buddhist bed and breakfast Hawaii",
  "meditation retreat Big Island",
  "yoga retreat Hawaii",
  "zazen meditation Hawaii",
  "Hakalau bed and breakfast",
  "Hamakua Coast lodging",
  "Big Island spiritual retreat",
  "silent retreat Hawaii",
  "Zen retreat Big Island",
  "Buddhist retreat center Hawaii",
  "peaceful retreat Hilo Hawaii",
  "nature retreat Hawaii",
  "mindfulness retreat Hawaii",
  "tai chi Hawaii",
  "rainforest cottage Big Island",
  "Wailea Village Hawaii",
  "hiking waterfalls Hamakua Coast",
  "long term stay Big Island",
];

/**
 * Link-preview image.
 *
 * Everything under /public/og is a real 1200x630 JPEG. Social and messaging
 * previews are the reason for both constraints: they crop anything that isn't
 * roughly 1.91:1, and several of them (notably Facebook and iMessage) will not
 * decode AVIF, which is the format most of the site's photos use.
 */
export const DEFAULT_OG_IMAGE = {
  url: "/og/default.jpg",
  width: 1200,
  height: 630,
  alt: "The temple building and veranda surrounded by rainforest at Akiko's Buddhist Bed & Breakfast on the Hamakua Coast of Hawaii",
};

/** Absolute URL helper for canonicals, sitemap entries and structured data. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /**
   * Set when the page's own title already carries the brand, so the layout's
   * "%s | Akiko's Buddhist B&B" template doesn't append it a second time.
   */
  absoluteTitle?: boolean;
  image?: string;
  imageAlt?: string;
  keywords?: string[];
};

/**
 * Builds the repeated title/description/canonical/OpenGraph block so every page
 * gets a unique, self-consistent set of tags instead of inheriting the layout's
 * defaults.
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  image = DEFAULT_OG_IMAGE.url,
  imageAlt = DEFAULT_OG_IMAGE.alt,
  keywords,
}: PageMetaInput) {
  const url = absoluteUrl(path);
  const socialTitle = absoluteTitle
    ? title
    : `${title} | ${BUSINESS.shortName}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords: keywords ?? SITE_KEYWORDS,
    alternates: { canonical: url },
    openGraph: {
      type: "website" as const,
      url,
      siteName: BUSINESS.shortName,
      title: socialTitle,
      description,
      locale: "en_US",
      images: [{ url: image, width: 1200, height: 630, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: socialTitle,
      description,
      images: [image],
    },
  };
}
