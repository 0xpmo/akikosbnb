"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft, ChevronRight, X, Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function MangoTreeCottage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const images = [
    {
      src: "/mango/mango-exterior.webp",
      alt: "Mango Tree Cottage exterior with screened walls",
    },
    {
      src: "/mango/mango-tree-inside.avif",
      alt: "Interior view showing bed and screened open-air design",
    },
    {
      src: "/mango/mango-tree-garden-path.webp",
      alt: "Tropical garden path with red anthurium flowers leading to cottage",
    },
    {
      src: "/mango/mango-tree-outside-statues.avif",
      alt: "Outside view of the cottage with statues",
    },
    // {
    //   src: "/mango/mango-tree-interior-2.avif",
    //   alt: "Another interior view of the airy cottage space",
    // },
    // {
    //   src: "/mango/mango-tree-meditation-room.avif",
    //   alt: "Morning sun streaming into Puja/Prayer meditation room under ancient guava tree",
    // },
  ];

  const nextImage = () => {
    const nextIndex = (selectedImageIndex + 1) % currentImages.length;
    setSelectedImageIndex(nextIndex);
    setSelectedImage(currentImages[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex =
      selectedImageIndex === 0
        ? currentImages.length - 1
        : selectedImageIndex - 1;
    setSelectedImageIndex(prevIndex);
    setSelectedImage(currentImages[prevIndex]);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setSelectedImageIndex(0);
    setCurrentImages([]);
  };

  // Keyboard navigation for image modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!selectedImage || currentImages.length <= 1) return;

      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          prevImage();
          break;
        case "ArrowRight":
          event.preventDefault();
          nextImage();
          break;
        case "Escape":
          event.preventDefault();
          closeModal();
          break;
      }
    };

    if (selectedImage) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [selectedImage, selectedImageIndex, currentImages.length]);

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage:
          "url('/homescreen/calligraphy-paper-bg.webp'), url('/homescreen/calligraphy-paper-bg-option.webp')",
        backgroundSize: "cover, cover",
        backgroundAttachment: "scroll, scroll",
        backgroundRepeat: "no-repeat, no-repeat",
        backgroundPosition: "center top, center top",
      }}
    >
      {/* Header */}
      <header
        className="backdrop-blur-sm sticky top-0 z-50 shadow-2xl"
        style={{ backgroundColor: "#153025" }}
      >
        <div className="container mx-auto px-4 py-1 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-4 hover:opacity-90 transition-opacity"
          >
            <Image
              src="/AKIKOSwhitetext.webp"
              alt="Akiko's Buddhist B&B"
              width={200}
              height={96}
              className="h-24 w-auto"
              priority
              sizes="200px"
            />
            <div>
              <h1 className="font-['Yuji_Boku'] text-xl font-semibold text-white">
                Buddhist B&B
              </h1>
              <p className="hidden lg:block text-sm text-white/70 font-['Yuji_Boku']">
                Hakalau, Hamakua Coast, Hawaii
              </p>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="/"
              className="text-white hover:text-white/80 transition-colors font-['Yuji_Boku']"
            >
              Home
            </a>
            <a
              href="/#accommodations"
              className="text-white hover:text-white/80 transition-colors font-['Yuji_Boku'] border-b border-white/40"
            >
              Accommodations
            </a>
            <Link
              href="/facilities"
              className="text-white hover:text-white/80 transition-colors font-['Yuji_Boku']"
            >
              Amenities
            </Link>
            <Link
              href="/reviews"
              className="text-white hover:text-white/80 transition-colors font-['Yuji_Boku']"
            >
              Reviews
            </Link>
            <Link
              href="/contact"
              className="text-white hover:text-white/80 transition-colors font-['Yuji_Boku']"
            >
              Contact
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div
            className="md:hidden bg-[#153025] border-t border-white/20"
            style={{ backgroundColor: "#153025" }}
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <Link
                href="/"
                className="text-white hover:text-white/80 transition-colors font-['Yuji_Boku'] py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <a
                href="/#accommodations"
                className="text-white hover:text-white/80 transition-colors font-['Yuji_Boku'] py-2 border-b border-white/40 pb-3"
                onClick={() => setMobileMenuOpen(false)}
              >
                Accommodations
              </a>
              <Link
                href="/facilities"
                className="text-white hover:text-white/80 transition-colors font-['Yuji_Boku'] py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Amenities
              </Link>
              <Link
                href="/reviews"
                className="text-white hover:text-white/80 transition-colors font-['Yuji_Boku'] py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Reviews
              </Link>
              <Link
                href="/contact"
                className="text-white hover:text-white/80 transition-colors font-['Yuji_Boku'] py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Image Gallery */}
      <section className="relative py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl font-light mb-4 text-foreground">
              Mango Tree Cottage
            </h1>
            <p className="text-lg text-muted-foreground">
              Living harmony under the giant mango
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-start">
            {images.map((image, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer ${
                  index === 0 ? "md:col-span-1" : ""
                }`}
                onClick={() => {
                  setSelectedImage(image.src);
                  setSelectedImageIndex(index);
                  setCurrentImages(images.map((img) => img.src));
                }}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  width={400}
                  height={index === 0 ? 320 : 256}
                  className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                    index === 0 ? "h-80" : "h-64"
                  }`}
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  loading={index === 0 ? "eager" : "lazy"}
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="md:col-span-1 space-y-8">
            <div>
              <h2 className="font-serif text-3xl font-light mb-6">
                Being Outdoors, Being Indoors, Simultaneously
              </h2>
              <div className="prose prose-lg text-muted-foreground leading-relaxed space-y-4">
                <p>
                  The Mango Tree Cottage is a 16 x 24 screened studio space,
                  completely open to the outdoors. Listen to the winds, rain
                  "dancing" on the tin roof, crickets, falling avocados and ripe
                  mangoes when in season.
                </p>
                <p>
                  A comfortable reading chair, table for work or eating, and a
                  gracious queen size bed—basic—offering minimal simplicity. The
                  bathroom and kitchenette are in an adjacent building, and
                  shared with the other person staying in the Banana Patch
                  Cottage.
                </p>
                <p>
                  Living in the Mango Tree Cottage is an experience of living
                  harmony: BEING OUTDOORS, BEING INDOORS, simultaneously. This
                  unique space allows you to fully immerse yourself in Hawaii's
                  natural rhythms while maintaining comfort and shelter.
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-serif text-2xl font-light mb-8">Amenities</h3>
              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute -left-2 sm:-left-4 top-0 w-1 h-full bg-gradient-to-b from-primary to-primary/50"></div>
                  <div className="pl-6 sm:pl-8">
                    <h4 className="font-serif text-xl font-light mb-2 text-foreground">
                      Queen size bed
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Comfortable queen size bed for restful sleep in the
                      open-air cottage.
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-2 sm:-left-4 top-0 w-1 h-full bg-gradient-to-b from-primary to-primary/50"></div>
                  <div className="pl-6 sm:pl-8">
                    <h4 className="font-serif text-xl font-light mb-2 text-foreground">
                      Reading chair & work table
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Comfortable reading chair and work table for study,
                      writing, or remote work.
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-2 sm:-left-4 top-0 w-1 h-full bg-gradient-to-b from-primary to-primary/50"></div>
                  <div className="pl-6 sm:pl-8">
                    <h4 className="font-serif text-xl font-light mb-2 text-foreground">
                      Shared kitchenette
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Access to shared kitchenette facilities in the adjacent
                      building.
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-2 sm:-left-4 top-0 w-1 h-full bg-gradient-to-b from-primary to-primary/50"></div>
                  <div className="pl-6 sm:pl-8">
                    <h4 className="font-serif text-xl font-light mb-2 text-foreground">
                      High-speed WiFi (88 Mbps)
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Reliable high-speed internet for staying connected while
                      enjoying nature.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Card
              className="rounded-none border-none shadow-none"
              style={{
                backgroundImage:
                  "url('/homescreen/calligraphy-paper-bg-option.webp')",
                backgroundSize: "cover",
                backgroundPosition: "top -9px center",
              }}
            >
              <CardHeader>
                <CardTitle className="font-serif text-2xl">
                  Rates & Booking
                </CardTitle>
                <CardDescription>All rates plus tax</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">
                    $85/night
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Single occupancy
                  </p>
                  <div className="text-xl font-semibold text-primary mt-2">
                    +$25/night
                  </div>
                  <p className="text-sm text-muted-foreground">Second person</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">7 nights minimum</span>
                    <span className="text-sm font-medium">Base rate</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">2+ weeks</span>
                    <span className="text-sm font-medium text-primary">
                      15% discount
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">1+ month</span>
                    <span className="text-sm font-medium text-primary">
                      30% discount
                    </span>
                  </div>
                </div>

                <div className="border-t subtle-border pt-4">
                  <p className="text-xs text-muted-foreground mb-4">
                    High-speed WiFi included. $40 additional fee for month-long
                    stays. 60-day maximum stay.
                  </p>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90">
                  <Link href="/contact?accommodation=Mango Tree Cottage">
                    Inquire to Book
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Guest Reviews Section */}
      <div className="py-16 bg-muted/20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h3 className="font-serif text-3xl font-light mb-4 text-foreground">
              Guest Experiences
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Discover what guests love about the harmonious blend of indoor and
              outdoor living
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-none shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="text-primary/40 mb-2">
                    <svg
                      className="h-8 w-8"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14,17H17L19,13V7H13V13H16M6,17H9L11,13V7H5V13H8L6,17Z" />
                    </svg>
                  </div>
                </div>
                <blockquote className="text-base leading-relaxed text-foreground italic mb-4">
                  "To stay at Akiko's Buddhist B&B is to step into Old Hawai'i,
                  a place and time and way of life that is a wonder to discover.
                  The sounds of gentle wind chimes and waterfalls, the
                  fragrances of gardenia and meditation incense, the flavors of
                  just-picked papaya all invite a feeling of reverence for
                  life's simplest gifts."
                </blockquote>
                <cite className="text-sm font-medium text-primary not-italic">
                  — Katy Fogg
                </cite>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="text-primary/40 mb-2">
                    <svg
                      className="h-8 w-8"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14,17H17L19,13V7H13V13H16M6,17H9L11,13V7H5V13H8L6,17Z" />
                    </svg>
                  </div>
                </div>
                <blockquote className="text-base leading-relaxed text-foreground italic mb-4">
                  "It is a place infused with the spirit of old Hawaii and an
                  understanding of the nuances of aloha. I have travelled many
                  places and gathered many memories, but rarely have I
                  encountered a place so affecting, whose presence changed how I
                  see my day-to-day life back home."
                </blockquote>
                <cite className="text-sm font-medium text-primary not-italic">
                  — Dave Millar
                </cite>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Link href="/reviews">
              <Button
                variant="outline"
                size="lg"
                className="font-serif hover:bg-primary hover:text-white transition-colors"
              >
                Read More Guest Reflections →
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Image Modal with Navigation */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div className="relative max-w-6xl max-h-full w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Previous Button */}
            {currentImages.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
            )}

            {/* Next Button */}
            {currentImages.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            )}

            {/* Image Counter */}
            {currentImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                {selectedImageIndex + 1} / {currentImages.length}
              </div>
            )}

            {/* Image */}
            <Image
              src={selectedImage}
              alt="Accommodation image"
              width={1200}
              height={800}
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
              sizes="90vw"
              priority
            />
          </div>
        </div>
      )}
    </div>
  );
}
