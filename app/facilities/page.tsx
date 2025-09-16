"use client";

import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Facilities() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [currentFacilityImages, setCurrentFacilityImages] = useState<string[]>(
    []
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          src: "/facilities/yoga-studio/yoga-room.webp",
          alt: "Yoga Studio main room",
        },
        {
          src: "/facilities/yoga-studio/yoga-altar.webp",
          alt: "Yoga Studio altar area",
        },
        {
          src: "/facilities/yoga-studio/yoga-teacher-area.webp",
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
          src: "/facilities/zendo/zendo-inside.webp",
          alt: "Zendo interior view",
        },
        {
          src: "/facilities/zendo/altar.webp",
          alt: "Zendo altar",
        },
        {
          src: "/facilities/zendo/inside-altar.webp",
          alt: "Zendo altar close view",
        },
        {
          src: "/facilities/zendo/wall-blocks.webp",
          alt: "Zendo wall elements",
        },
        {
          src: "/facilities/zendo/zendo-outside-rotated.jpg",
          alt: "Zendo exterior",
        },
      ],
    },
  ];

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage:
          "url('/homescreen/calligraphy-paper-bg.webp'), url('/homescreen/calligraphy-paper-bg-option.webp')",
        backgroundSize: "cover, cover",
        backgroundAttachment: "scroll, fixed",
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
              src="/AKIKOSwhitetext.webp"
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
          <nav className="hidden md:flex items-center gap-4 lg:gap-6">
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
              className="text-white hover:text-white/80 transition-colors font-['Yuji_Boku'] border-b border-white/40"
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
                className="text-white hover:text-white/80 transition-colors font-['Yuji_Boku'] py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Accommodations
              </a>
              <Link
                href="/facilities"
                className="text-white hover:text-white/80 transition-colors font-['Yuji_Boku'] py-2 border-b border-white/40 pb-3"
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

      {/* Page Header */}
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-['Yuji_Boku'] text-5xl font-light mb-6 text-foreground drop-shadow-sm">
            Sacred Amenities
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
                <div
                  className="inline-block px-8 py-10 shadow-lg"
                  style={{
                    backgroundImage:
                      "url('/homescreen/calligraphy-paper-bg-option.webp')",
                    backgroundSize: "cover",
                    backgroundPosition: "top -9px center",
                  }}
                >
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
        <div className="container mx-auto px-4 max-w-6xl">
          <h3 className="font-['Sawarabi_Mincho'] text-3xl font-light text-center mb-8 text-foreground drop-shadow-sm">
            Two-Acre Tropical Paradise
          </h3>

          {/* Grounds Gallery */}
          <div className="space-y-6 mb-8">
            <h4 className="font-['Sawarabi_Mincho'] text-2xl font-medium text-center text-foreground drop-shadow-sm">
              Grounds Gallery
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                "/grounds/akiko-entrance-road.avif",
                "/grounds/akiko-kitchen.JPG",
                "/grounds/akiko-pick-flower.JPG",
                "/grounds/akiko-walk-jungle.JPG",
                "/grounds/blue-house-jungle.JPG",
                "/grounds/front-door.JPG",
                "/grounds/grass-and-jungle.JPG",
                "/grounds/main-entrance.JPG",
                "/grounds/statue-yellow.avif",
                "/grounds/temple.avif",
                "/grounds/tree-tops.JPG",
                "/grounds/zendo-alleyway.avif",
              ].map((image, index) => (
                <div
                  key={index}
                  className="group cursor-pointer"
                  onClick={() => {
                    setSelectedImage(image);
                    setSelectedImageIndex(index);
                    setCurrentFacilityImages([
                      "/grounds/akiko-entrance-road.avif",
                      "/grounds/akiko-kitchen.JPG",
                      "/grounds/akiko-pick-flower.JPG",
                      "/grounds/akiko-walk-jungle.JPG",
                      "/grounds/blue-house-jungle.JPG",
                      "/grounds/front-door.JPG",
                      "/grounds/grass-and-jungle.JPG",
                      "/grounds/main-entrance.JPG",
                      "/grounds/statue-yellow.avif",
                      "/grounds/temple.avif",
                      "/grounds/tree-tops.JPG",
                      "/grounds/zendo-alleyway.avif",
                    ]);
                  }}
                >
                  <div
                    className="h-48 lg:h-56 bg-muted bg-cover bg-center rounded-xl group-hover:scale-105 transition-transform duration-300 shadow-lg group-hover:shadow-xl"
                    style={{
                      backgroundImage: `url('${image}')`,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <p className="text-center text-foreground leading-relaxed drop-shadow-sm max-w-3xl mx-auto">
            Wander through our lush tropical gardens featuring native Hawaiian
            plants, fruit trees, and peaceful pathways. The grounds include
            citrus orchards, breadfruit groves, and countless quiet spots for
            reflection and connection with nature.
          </p>
        </div>

        {/* Footer */}
        <footer className="border-t border-white/20 py-12 mt-20">
          <div className="container mx-auto px-4 text-center">
            <div className="mb-6">
              <img
                src="/akiko-black-logo.webp"
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
    </div>
  );
}
