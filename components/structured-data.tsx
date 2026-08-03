import {
  BUSINESS,
  DEFAULT_OG_IMAGE,
  SITE_URL,
  absoluteUrl,
} from "@/lib/seo";

/**
 * Schema.org JSON-LD.
 *
 * This is how Google learns that the site belongs to a real lodging business at
 * a real address with real rooms and prices, rather than being an anonymous
 * brochure page. It is also what feeds rich results and helps Google connect
 * the site to the Google Business Profile listing.
 */

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // The payload is built from static constants in this repo, never from
      // user input, so serializing it directly is safe.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const BUSINESS_ID = `${SITE_URL}/#lodging`;

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: BUSINESS.streetAddress,
  addressLocality: BUSINESS.addressLocality,
  addressRegion: BUSINESS.addressRegion,
  postalCode: BUSINESS.postalCode,
  addressCountry: BUSINESS.addressCountry,
};

/** Site-wide business record. Rendered once, in the root layout. */
export function BusinessStructuredData() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BedAndBreakfast",
        "@id": BUSINESS_ID,
        name: BUSINESS.name,
        alternateName: BUSINESS.shortName,
        url: SITE_URL,
        description:
          "A Buddhist bed & breakfast and meditation retreat on the Hamakua Coast of Hawaii, 15 miles north of Hilo. Zazen meditation, yoga, tai chi, and quiet cottages on two acres of tropical gardens and rainforest.",
        image: absoluteUrl(DEFAULT_OG_IMAGE.url),
        logo: absoluteUrl("/akiko-black-logo.webp"),
        telephone: BUSINESS.phone,
        email: BUSINESS.email,
        priceRange: BUSINESS.priceRange,
        currenciesAccepted: "USD",
        address: postalAddress,
        geo: {
          "@type": "GeoCoordinates",
          latitude: BUSINESS.latitude,
          longitude: BUSINESS.longitude,
        },
        areaServed: [
          { "@type": "Place", name: "Hakalau, Hawaii" },
          { "@type": "Place", name: "Hamakua Coast, Hawaii" },
          { "@type": "Place", name: "Hilo, Hawaii" },
          { "@type": "Place", name: "Island of Hawaii (Big Island)" },
        ],
        knowsAbout: [
          "Zen Buddhism",
          "Zazen meditation",
          "Yoga",
          "Tai chi",
          "Japanese American culture in Hawaii",
        ],
        petsAllowed: false,
        numberOfRooms: 7,
        checkinTime: "15:00",
        checkoutTime: "11:00",
        amenityFeature: [
          "Zendo meditation hall",
          "Yoga studio",
          "Zazen meditation sessions",
          "Restorative yoga classes",
          "Two acres of tropical gardens",
          "Citrus orchard and breadfruit grove",
          "Shared kitchen",
          "High-speed WiFi",
          "Free parking",
        ].map((name) => ({
          "@type": "LocationFeatureSpecification",
          name,
          value: true,
        })),
        makesOffer: ACCOMMODATIONS.map((room) => ({
          "@type": "Offer",
          name: room.name,
          url: absoluteUrl(room.path),
          price: room.price,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        })),
        sameAs: [
          "https://www.facebook.com/1652218805095951",
          "https://www.tripadvisor.com/Hotel_Review-g60581-d120672-Reviews-Akiko_s_Buddhist_Bed_And_Breakfast-Hakalau_Island_of_Hawaii_Hawaii.html",
          "https://www.yelp.com/biz/akikos-buddhist-bed-and-breakfast-hakalau",
        ],
      }}
    />
  );
}

export const ACCOMMODATIONS = [
  {
    path: "/banana-patch",
    name: "Banana Patch Cottage",
    price: 75,
    occupancy: 1,
    description:
      "A 12x12 solo retreat cottage nestled in a banana grove, with a bamboo frame bed and shared kitchen and bath.",
    image: "/og/banana-patch.jpg",
  },
  {
    path: "/mango-tree",
    name: "Mango Tree Cottage",
    price: 85,
    occupancy: 2,
    description:
      "A 16x24 screened studio under a giant mango tree, open to the rainforest, with a queen bed and shared kitchen and bath.",
    image: "/og/mango-tree.jpg",
  },
  {
    path: "/puuhonua-house",
    name: "Pu'uhonua House",
    price: 75,
    occupancy: 2,
    description:
      "Private bedrooms in a classic old Hawaiian plantation community house with a shared kitchen, library and veranda.",
    image: "/og/puuhonua-house.jpg",
  },
  {
    path: "/hale-aloha",
    name: "Hale Aloha",
    price: 150,
    occupancy: 4,
    description:
      "A private three-bedroom plantation-style home with a full kitchen and large picture windows onto the gardens, sleeping up to four.",
    image: "/og/hale-aloha.jpg",
  },
] as const;

type Accommodation = (typeof ACCOMMODATIONS)[number];

/** Per-room record for the four accommodation pages. */
export function AccommodationStructuredData({
  room,
}: {
  room: Accommodation;
}) {
  const url = absoluteUrl(room.path);

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Accommodation",
        "@id": `${url}#accommodation`,
        name: room.name,
        url,
        description: room.description,
        image: absoluteUrl(room.image),
        address: postalAddress,
        occupancy: {
          "@type": "QuantitativeValue",
          maxValue: room.occupancy,
          unitCode: "C62",
        },
        containedInPlace: { "@id": BUSINESS_ID },
        potentialAction: {
          "@type": "ReserveAction",
          target: absoluteUrl("/contact"),
        },
        offers: {
          "@type": "Offer",
          url,
          price: room.price,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          eligibleDuration: {
            "@type": "QuantitativeValue",
            minValue: 7,
            unitCode: "DAY",
          },
        },
      }}
    />
  );
}

/** Breadcrumb trail so Google shows a readable path instead of a raw URL. */
export function BreadcrumbStructuredData({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: absoluteUrl(item.path),
        })),
      }}
    />
  );
}
