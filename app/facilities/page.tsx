"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowLeft,
  Leaf,
  Mountain,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Facilities() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [currentFacilityImages, setCurrentFacilityImages] = useState<string[]>(
    []
  );

  const nextImage = () => {
    const nextIndex = (selectedImageIndex + 1) % currentFacilityImages.length;
    setSelectedImageIndex(nextIndex);
    setSelectedImage(currentFacilityImages[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex =
      selectedImageIndex === 0
        ? currentFacilityImages.length - 1
        : selectedImageIndex - 1;
    setSelectedImageIndex(prevIndex);
    setSelectedImage(currentFacilityImages[prevIndex]);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setSelectedImageIndex(0);
    setCurrentFacilityImages([]);
  };

  // Keyboard navigation for image modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!selectedImage || currentFacilityImages.length <= 1) return;

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
  }, [selectedImage, selectedImageIndex, currentFacilityImages.length]);

  const facilities = [
    {
      id: "yoga-studio",
      title: "Yoga Studio",
      description: "Spacious movement and meditation space",
      longDescription:
        "Large, open studio with wooden floors and natural lighting, perfect for yoga, tai chi, and movement practices. Features exposed beam ceiling and views of tropical gardens.",
      images: [
        {
          src: "/facilities/yoga-studio/yoga-room.jpeg",
          alt: "Yoga Studio main room",
        },
        {
          src: "/facilities/yoga-studio/yoga-altar.jpeg",
          alt: "Yoga Studio altar area",
        },
        {
          src: "/facilities/yoga-studio/yoga-teacher-area.jpeg",
          alt: "Yoga Studio teacher area",
        },
      ],
    },
    {
      id: "zendo",
      title: "Zendo",
      description: "Sacred meditation space",
      longDescription:
        "Traditional meditation hall for zazen practice and quiet contemplation. A serene space designed for deep spiritual practice and group meditation sessions.",
      images: [
        {
          src: "/facilities/zendo/zendo-inside.jpg",
          alt: "Zendo interior view",
        },
        {
          src: "/facilities/zendo/altar.jpeg",
          alt: "Zendo altar",
        },
        {
          src: "/facilities/zendo/inside-altar.jpeg",
          alt: "Zendo altar close view",
        },
        {
          src: "/facilities/zendo/wall-blocks.jpeg",
          alt: "Zendo wall elements",
        },
        {
          src: "/facilities/zendo/zendo-outside.jpeg",
          alt: "Zendo exterior",
        },
      ],
    },
  ];

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: "url('/images/calligraphy-paper-bg-option.png')",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Header */}
      <header
        className="backdrop-blur-sm sticky top-0 z-50 shadow-2xl"
        style={{ backgroundColor: "#123233" }}
      >
        <div className="container mx-auto px-4 py-1 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src="/images/AKIKOSwhitetext.png"
              alt="Akiko's Buddhist B&B"
              className="h-24 w-auto"
            />
            <div>
              <h1 className="font-['Yuji_Boku'] text-xl font-semibold text-white">
                Buddhist B&B
              </h1>
              <p className="text-sm text-white/70 font-['Noto_Sans']">
                Wailea Village, Hamakua Coast
              </p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/#accommodations"
              className="text-white hover:text-white/80 transition-colors font-['Noto_Sans']"
            >
              Stay
            </Link>
            <Link
              href="/#activities"
              className="text-white hover:text-white/80 transition-colors font-['Noto_Sans']"
            >
              Activities
            </Link>
            <Link
              href="/#facilities"
              className="text-white hover:text-white/80 transition-colors font-['Noto_Sans']"
            >
              Facilities & Grounds
            </Link>
            <Link
              href="/#contact"
              className="text-white hover:text-white/80 transition-colors font-['Noto_Sans']"
            >
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Link href="/">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      {/* Page Header */}
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-['Yuji_Boku'] text-5xl font-light mb-6 text-foreground drop-shadow-sm">
            Sacred Facilities & Grounds
          </h2>
          <p className="text-xl text-foreground max-w-3xl mx-auto leading-relaxed drop-shadow-sm">
            Discover our sacred spaces designed for meditation, movement, and
            spiritual practice. Each facility is thoughtfully created to support
            your journey of inner peace and awakening.
          </p>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {facilities.map((facility, index) => (
            <div key={facility.id} className="mb-24">
              {/* Facility Header */}
              <div className="text-center mb-12">
                <h3 className="font-['Yuji_Boku'] text-5xl font-light mb-4 text-foreground drop-shadow-sm">
                  {facility.title}
                </h3>
                <p className="text-xl text-foreground mb-6 drop-shadow-sm">
                  {facility.description}
                </p>
                <p className="text-foreground leading-relaxed drop-shadow-sm max-w-3xl mx-auto">
                  {facility.longDescription}
                </p>
              </div>

              {/* Activity Times - Subtle Style */}
              <div className="text-center mb-12">
                <div className="inline-block bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-8 py-6 shadow-lg">
                  <h4 className="font-['Sawarabi_Mincho'] text-2xl font-medium text-foreground mb-4 drop-shadow-sm">
                    Weekly Practice Schedule
                  </h4>
                  {facility.id === "yoga-studio" ? (
                    <div className="space-y-2">
                      <p className="text-xl text-foreground font-medium drop-shadow-sm">
                        Restorative Yoga
                      </p>
                      <p className="text-lg text-foreground/80 drop-shadow-sm">
                        Monday & Thursday • 6:00-7:30pm
                      </p>
                      <p className="text-base text-foreground/70 italic drop-shadow-sm">
                        Join us in this sacred space for gentle movement and
                        inner peace
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-xl text-foreground font-medium drop-shadow-sm">
                        Zazen Meditation
                      </p>
                      <p className="text-lg text-foreground/80 drop-shadow-sm">
                        Wednesday & Friday • 7:00-8:15pm
                      </p>
                      <p className="text-base text-foreground/70 italic drop-shadow-sm">
                        Traditional seated meditation in our peaceful zendo
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Large Image Gallery */}
              <div className="space-y-6">
                <h4 className="font-['Sawarabi_Mincho'] text-2xl font-medium text-center text-foreground drop-shadow-sm">
                  Gallery
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {facility.images.map((image, imageIndex) => (
                    <div
                      key={imageIndex}
                      className="group cursor-pointer"
                      onClick={() => {
                        setSelectedImage(image.src);
                        setSelectedImageIndex(imageIndex);
                        setCurrentFacilityImages(
                          facility.images.map((img) => img.src)
                        );
                      }}
                    >
                      <div
                        className="h-64 lg:h-80 bg-muted bg-cover bg-center rounded-xl group-hover:scale-105 transition-transform duration-300 shadow-lg group-hover:shadow-xl"
                        style={{
                          backgroundImage: `url('${image.src}')`,
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Grounds Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h3 className="font-['Sawarabi_Mincho'] text-3xl font-light text-center mb-8 text-foreground drop-shadow-sm">
            Two-Acre Tropical Paradise
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <div
              className="h-32 bg-muted bg-cover bg-center rounded-lg"
              style={{
                backgroundImage: "url('/images/property-garden-1.avif')",
              }}
            />
            <div
              className="h-32 bg-muted bg-cover bg-center rounded-lg"
              style={{
                backgroundImage: "url('/images/property-garden-2.avif')",
              }}
            />
            <div
              className="h-32 bg-muted bg-cover bg-center rounded-lg"
              style={{
                backgroundImage: "url('/images/property-garden-3.avif')",
              }}
            />
            <div
              className="h-32 bg-muted bg-cover bg-center rounded-lg"
              style={{
                backgroundImage: "url('/images/property-garden-4.avif')",
              }}
            />
            <div
              className="h-32 bg-muted bg-cover bg-center rounded-lg"
              style={{
                backgroundImage: "url('/images/property-garden-5.avif')",
              }}
            />
          </div>
          <p className="text-center text-foreground leading-relaxed drop-shadow-sm">
            Wander through our lush tropical gardens featuring native Hawaiian
            plants, fruit trees, and peaceful pathways. The grounds include
            citrus orchards, breadfruit groves, and countless quiet spots for
            reflection and connection with nature.
          </p>
        </div>
      </section>

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
            {currentFacilityImages.length > 1 && (
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
            {currentFacilityImages.length > 1 && (
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
            {currentFacilityImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                {selectedImageIndex + 1} / {currentFacilityImages.length}
              </div>
            )}

            {/* Image */}
            <img
              src={selectedImage}
              alt="Facility image"
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-border bg-white/90 backdrop-blur-sm py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6">
            <img
              src="/images/akiko-logo-no-white.png"
              alt="Akiko's Buddhist B&B"
              className="h-24 w-auto mx-auto mb-4"
            />
            <p className="text-muted-foreground max-w-md mx-auto">
              In gratitude to our ancestors and in service to all who come
              seeking awakening in Hawaii's sacred beauty.
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2025 {"Akiko's Buddhist B&B"}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
