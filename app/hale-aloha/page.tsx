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
import { useState, useEffect } from "react";

export default function HaleAloha() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const images = [
    {
      src: "/images/hale-aloha-exterior.avif",
      alt: "Hale Aloha exterior - beautiful plantation-style home",
    },
    {
      src: "/images/hale-aloha-living-room.avif",
      alt: "Living room with large picture windows",
    },
    {
      src: "/images/hale-aloha-living-space.avif",
      alt: "Spacious living area with natural light",
    },
    {
      src: "/images/hale-aloha-bedroom-1.avif",
      alt: "Comfortable bedroom with natural lighting",
    },
    {
      src: "/images/hale-aloha-bedroom-2.avif",
      alt: "Second bedroom with plantation style charm",
    },
    {
      src: "/images/hale-aloha-kitchen.avif",
      alt: "Spacious kitchen cooled by trade winds",
    },
    {
      src: "/images/hale-aloha-dining.avif",
      alt: "Dining area with comfortable seating",
    },
    {
      src: "/images/hale-aloha-bathroom.avif",
      alt: "Clean, functional bathroom",
    },
    {
      src: "/images/hale-aloha-interior-1.avif",
      alt: "Interior hallway and living spaces",
    },
    {
      src: "/images/hale-aloha-interior-2.avif",
      alt: "Additional interior view",
    },
    {
      src: "/images/hale-aloha-interior-3.avif",
      alt: "Another interior perspective of the home",
    },
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
            <img
              src="/images/AKIKOSwhitetext.png"
              alt="Akiko's Buddhist B&B"
              className="h-24 w-auto"
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
              Hale Aloha
            </h1>
            <p className="text-lg text-muted-foreground">
              Home of Aloha and Warmth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {images.map((image, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer ${
                  index === 0 ? "md:col-span-2 lg:col-span-2" : ""
                }`}
                onClick={() => {
                  setSelectedImage(image.src);
                  setSelectedImageIndex(index);
                  setCurrentImages(images.map((img) => img.src));
                }}
              >
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                    index === 0 ? "h-80" : "h-64"
                  }`}
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
                Elegance & Charm of Old Hawaii
              </h2>
              <div className="prose prose-lg text-muted-foreground leading-relaxed space-y-4">
                <p>
                  Hale Aloha, Home of Aloha and Warmth, is a beautiful 3
                  bedroom, 1½ bath home, surrounded by flowers and fruit trees.
                  The living room "breathes" a quiet serenity and a settled,
                  eloquent beauty.
                </p>
                <p>
                  The large picture windows of this gracious older-style home
                  open up to a lush and wild and abundant Hawaii. A spacious
                  style kitchen, cooled by ocean trade winds, encourages "casual
                  stillness" and a return to simplicity.
                </p>
                <p>
                  Return to "human rhythm;" return to the elegance and charm of
                  "old Hawaii." Sleeps up to 4 people on Retreat and Refuge.
                  Guests are encouraged to stay a month. Settle deeply,
                  experience the peace and beauty of our beloved Hawaii.
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-serif text-2xl font-light mb-8">
                Private Home Features
              </h3>
              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-primary to-primary/50"></div>
                  <div className="pl-8">
                    <h4 className="font-serif text-xl font-light mb-2 text-foreground">
                      3 bedrooms, 1½ bath
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Spacious private home with comfortable accommodations for
                      extended stays.
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-primary to-primary/50"></div>
                  <div className="pl-8">
                    <h4 className="font-serif text-xl font-light mb-2 text-foreground">
                      Large picture windows
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Expansive windows that open up to lush Hawaiian landscapes
                      and natural light.
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-primary to-primary/50"></div>
                  <div className="pl-8">
                    <h4 className="font-serif text-xl font-light mb-2 text-foreground">
                      Spacious kitchen
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Fully-equipped kitchen cooled by ocean trade winds for
                      comfortable cooking.
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-primary to-primary/50"></div>
                  <div className="pl-8">
                    <h4 className="font-serif text-xl font-light mb-2 text-foreground">
                      Surrounded by gardens
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Beautiful home nestled among flowers and fruit trees in a
                      tropical setting.
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-primary to-primary/50"></div>
                  <div className="pl-8">
                    <h4 className="font-serif text-xl font-light mb-2 text-foreground">
                      Sleeps up to 4 people
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Perfect for families or groups seeking a private retreat
                      experience.
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-primary to-primary/50"></div>
                  <div className="pl-8">
                    <h4 className="font-serif text-xl font-light mb-2 text-foreground">
                      High-speed WiFi (44 Mbps)
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Reliable internet connection for remote work and staying
                      connected.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 p-6 rounded-lg">
              <h4 className="font-serif text-lg font-medium mb-3">
                Perfect for Extended Stays
              </h4>
              <p className="text-muted-foreground">
                This private home is ideal for those seeking a longer retreat
                experience. With full amenities and the space to truly settle
                in, Hale Aloha offers the perfect environment for deep
                transformation and connection with Hawaii's natural rhythms.
              </p>
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
                    $150/night
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Single occupancy
                  </p>
                  <div className="text-xl font-semibold text-primary mt-2">
                    +$35/night
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Each additional person
                  </p>
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
                    Private home for up to 4 guests. High-speed WiFi included.
                    Monthly stays encouraged for deeper transformation.
                  </p>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90">
                  <Link href="/contact?accommodation=Hale Aloha">
                    Inquire to Book
                  </Link>
                </Button>
              </CardContent>
            </Card>
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
            <img
              src={selectedImage}
              alt="Accommodation image"
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
