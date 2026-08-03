import Link from "next/link";
import { BUSINESS } from "@/lib/seo";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/banana-patch", label: "Banana Patch Cottage" },
  { href: "/mango-tree", label: "Mango Tree Cottage" },
  { href: "/puuhonua-house", label: "Pu'uhonua House" },
  { href: "/hale-aloha", label: "Hale Aloha" },
  { href: "/facilities", label: "Amenities" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

/**
 * Shared footer.
 *
 * Two jobs beyond looking finished: it puts the full name/address/phone on
 * every page, which is what local search uses to match the site to the
 * business listing, and it links every page to every other page so crawlers
 * (and guests) can reach the accommodation pages from anywhere.
 */
export function SiteFooter({ className = "" }: { className?: string }) {
  return (
    <footer className={`py-12 mt-20 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/akiko-black-logo.webp"
            alt="Akiko's Buddhist Bed & Breakfast"
            className="h-24 w-auto mx-auto mb-4"
          />
          <p className="text-muted-foreground max-w-md mx-auto">
            In gratitude to our ancestors and in service to all who come seeking
            awakening in Hawaii's sacred beauty.
          </p>
        </div>

        <nav
          aria-label="Footer"
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8 text-sm"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <address className="not-italic text-center text-sm text-muted-foreground space-y-1 mb-8">
          <p className="font-medium text-foreground">{BUSINESS.name}</p>
          <p>
            {BUSINESS.streetAddress}, {BUSINESS.addressLocality},{" "}
            {BUSINESS.addressRegion} {BUSINESS.postalCode}
          </p>
          <p>Hamakua Coast · 15 miles north of Hilo, Island of Hawaii</p>
          <p>
            <a
              href={`tel:${BUSINESS.phone.replace(/[^+\d]/g, "")}`}
              className="hover:text-primary transition-colors"
            >
              {BUSINESS.phoneDisplay}
            </a>
            {" · "}
            <a
              href={`mailto:${BUSINESS.email}?subject=Booking Inquiry`}
              className="hover:text-primary transition-colors"
            >
              {BUSINESS.email}
            </a>
          </p>
        </address>

        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
