"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function BananaPatchCottage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [currentImages, setCurrentImages] = useState<string[]>([]);

  const images = [
    {
      src: "/images/banana-patch-exterior.avif",
      alt: "Banana Patch Cottage exterior nestled in tropical vegetation",
    },
    {
      src: "/images/banana-patch-interior-1.avif",
      alt: "Cozy interior with bed and natural lighting",
    },
    {
      src: "/images/banana-patch-interior-2.avif",
      alt: "Sleeping area with rustic wooden walls",
    },
    {
      src: "/images/banana-patch-bathroom.avif",
      alt: "Simple bathroom facilities",
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
        backgroundImage: "url('/homescreen/calligraphy-paper-bg-option.png')",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center top",
      }}
    >
      {/* Header */}
      <header
        className="backdrop-blur-sm sticky top-0 z-50 shadow-2xl"
        style={{ backgroundColor: "#1a5d52" }}
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
              <p className="text-sm text-white/70 font-['Yuji_Boku']">
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
              className="text-white hover:text-white/80 transition-colors font-['Yuji_Boku']"
            >
              Accommodations
            </a>
            <Link
              href="/facilities"
              className="text-white hover:text-white/80 transition-colors font-['Yuji_Boku']"
            >
              Facilities & Grounds
            </Link>
            <Link
              href="/contact"
              className="text-white hover:text-white/80 transition-colors font-['Yuji_Boku']"
            >
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Image Gallery */}
      <section className="relative py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl font-light mb-4 text-foreground">
              Banana Patch Cottage
            </h1>
            <p className="text-lg text-muted-foreground">
              Personal retreat in the banana grove
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {images.map((image, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer ${
                  index === 0 ? "md:col-span-2" : ""
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
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="font-serif text-3xl font-light mb-6">
                A Sacred Retreat Space
              </h2>
              <div className="prose prose-lg text-muted-foreground leading-relaxed space-y-4">
                <p>
                  The Banana Patch is for someone seeking personal retreat time,
                  quiet, yoga, tai chi and zazen practices, plus working
                  remotely, and many opportunities to explore Hawai'i.
                </p>
                <p>
                  The 12x12 cottage is intimately nestled in a grove of banana
                  trees. Hear & feel the winds, the rain dancing on the tin
                  roof, the cascading leaves, the coqui frogs, and the falling
                  "torpedo" avos & mango, when in season.
                </p>
                <p>
                  Sleep on a bamboo frame bed or sit on the comfy reading chair
                  enjoying the wide variety of books. Journal daily when arising
                  early with the coming of the early morning light. Go deeply
                  within while opening to the Great Wild Natural Rainforest.
                </p>
                <p>
                  Return to simple naturalness. Calm & settle the soul. Just 15
                  miles north of Hilo along the luscious Hamakua coast on the
                  island of Hawaii.
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-serif text-2xl font-light mb-8">Amenities</h3>
              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-primary to-primary/50"></div>
                  <div className="pl-8">
                    <h4 className="font-serif text-xl font-light mb-2 text-foreground">
                      Bamboo frame bed
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Natural bamboo frame bed for a rustic, eco-friendly
                      sleeping experience.
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-primary to-primary/50"></div>
                  <div className="pl-8">
                    <h4 className="font-serif text-xl font-light mb-2 text-foreground">
                      Reading chair
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Comfortable reading chair for quiet contemplation and
                      study.
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-primary to-primary/50"></div>
                  <div className="pl-8">
                    <h4 className="font-serif text-xl font-light mb-2 text-foreground">
                      Shared kitchen
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Access to shared kitchen facilities for meal preparation.
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-primary to-primary/50"></div>
                  <div className="pl-8">
                    <h4 className="font-serif text-xl font-light mb-2 text-foreground">
                      High-speed WiFi (88 Mbps)
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Reliable high-speed internet for remote work and
                      connectivity.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="font-serif text-2xl">
                  Rates & Booking
                </CardTitle>
                <CardDescription>All rates plus tax</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">
                    $75/night
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Single occupancy
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">7 nights minimum</span>
                    <span className="text-sm font-medium">Base rate</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">2+ weeks</span>
                    <span className="text-sm font-medium text-green-600">
                      15% discount
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">1+ month</span>
                    <span className="text-sm font-medium text-green-600">
                      30% discount
                    </span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <p className="text-xs text-muted-foreground mb-4">
                    High-speed WiFi included. $40 additional fee for month-long
                    stays. 60-day maximum stay.
                  </p>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90">
                  <a href="/contact">Inquire to Book</a>
                </Button>
                <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground text-center">
                    Please call Akiko at (808) 963-6422 or fill out the inquiry
                    form to make your reservation
                  </p>
                </div>
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
