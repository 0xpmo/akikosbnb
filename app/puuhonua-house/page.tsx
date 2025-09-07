"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, ChevronLeft, ChevronRight, X, Menu } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function PuuhouaHouse() {
  const [selectedRoom, setSelectedRoom] = useState("shared");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sharedImages = [
    {
      src: "/puuhonua/jungle-blue-house.JPG",
      alt: "Pu'uhonua House exterior with lush jungle setting",
    },
    {
      src: "/puuhonua/akiko-stairs-blue-house.JPG",
      alt: "Beautiful stairs and entrance to the blue house",
    },
    {
      src: "/puuhonua/puuhonua-exterior.avif",
      alt: "Pu'uhonua House exterior - classic plantation style with veranda",
    },
    {
      src: "/puuhonua/puuhonua-living-room.avif",
      alt: "Living room with library and comfortable seating",
    },
    {
      src: "/puuhonua/puuhonua-common-area.avif",
      alt: "Common area with natural lighting and homey atmosphere",
    },
    {
      src: "/puuhonua/puuhonua-kitchen.avif",
      alt: "Fully-equipped kitchen and dining area",
    },
  ];

  const roomImages = {
    sunrise: [
      {
        src: "/puuhonua/sunrise/puuhonua-sunrise-room.avif",
        alt: "The Sunrise Room with first morning light streaming through windows",
      },
    ],
    elegantTree: [
      {
        src: "/puuhonua/elegant-tree/bed-tree-top-room.jpg",
        alt: "Elegant Tree Tops Room bed with beautiful canopy views",
      },
      {
        src: "/puuhonua/elegant-tree/window-treetop-room.jpg",
        alt: "Window view from the Tree Tops Room",
      },
      {
        src: "/puuhonua/elegant-tree/corner-room-tree.jpeg",
        alt: "Corner view of the Tree Tops Room",
      },
    ],
    rainforest: [
      {
        src: "/puuhonua/rainforest/bed-rainforest.jpg",
        alt: "Rainforest Room bed surrounded by lush tropical vegetation",
      },
      {
        src: "/puuhonua/rainforest/room-rainforest.jpg",
        alt: "Rainforest Room interior view",
      },
      {
        src: "/puuhonua/rainforest/window-rainforest.jpg",
        alt: "Window view from the Rainforest Room",
      },
    ],
  };

  const getCurrentImages = () => {
    if (selectedRoom === "shared") return sharedImages;
    return roomImages[selectedRoom as keyof typeof roomImages] || [];
  };

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

      {/* Room Selection Tabs - Fixed at top */}
      <div className="border-b border-white/20">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-8 py-6">
            <button
              onClick={() => setSelectedRoom("shared")}
              className={`px-4 py-2 font-medium transition-colors font-['Yuji_Boku'] text-lg border-b-2 cursor-pointer ${
                selectedRoom === "shared"
                  ? "text-primary border-primary"
                  : "text-muted-foreground border-transparent hover:text-foreground hover:border-muted-foreground"
              }`}
            >
              Shared Areas
            </button>
            <button
              onClick={() => setSelectedRoom("sunrise")}
              className={`px-4 py-2 font-medium transition-colors font-['Yuji_Boku'] text-lg border-b-2 cursor-pointer ${
                selectedRoom === "sunrise"
                  ? "text-primary border-primary"
                  : "text-muted-foreground border-transparent hover:text-foreground hover:border-muted-foreground"
              }`}
            >
              Sunrise Room
            </button>
            <button
              onClick={() => setSelectedRoom("elegantTree")}
              className={`px-4 py-2 font-medium transition-colors font-['Yuji_Boku'] text-lg border-b-2 cursor-pointer ${
                selectedRoom === "elegantTree"
                  ? "text-primary border-primary"
                  : "text-muted-foreground border-transparent hover:text-foreground hover:border-muted-foreground"
              }`}
            >
              Elegant Tree Tops Room
            </button>
            <button
              onClick={() => setSelectedRoom("rainforest")}
              className={`px-4 py-2 font-medium transition-colors font-['Yuji_Boku'] text-lg border-b-2 cursor-pointer ${
                selectedRoom === "rainforest"
                  ? "text-primary border-primary"
                  : "text-muted-foreground border-transparent hover:text-foreground hover:border-muted-foreground"
              }`}
            >
              Rainforest Room
            </button>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <section className="relative py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl font-light mb-4 text-foreground">
              Pu'uhonua House
            </h1>
            <p className="text-lg text-muted-foreground">
              {selectedRoom === "shared" &&
                "Sanctuary • Community • Old Hawaii"}
              {selectedRoom === "sunrise" && "Morning light & garden views"}
              {selectedRoom === "elegantTree" && "Elevated views of the canopy"}
              {selectedRoom === "rainforest" && "Intimate forest connection"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getCurrentImages().map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => {
                  setSelectedImage(image.src);
                  setSelectedImageIndex(index);
                  setCurrentImages(getCurrentImages().map((img) => img.src));
                }}
              >
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
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
                A Place of Refuge & Community
              </h2>
              <div className="prose prose-lg text-muted-foreground leading-relaxed space-y-4">
                <p>
                  The Pu'uhonua House is our "community house." PU'UHONUA means
                  "sanctuary", a safe place, a place of refuge. It is a
                  4-bedroom, 2-story "classic," with a veranda overlooking a
                  Hawaiian garden.
                </p>
                <p>
                  The SUNRISE ROOM & ELEGANT TREE TOPS ROOM both sleep 1 or 2
                  people. The RAINFOREST ROOM sleeps 1 person. The 1-3 guests
                  share a comfortable living room, a large & diverse library, a
                  fully-equipped kitchen, a cozy dining nook and bathroom.
                </p>
                <p>
                  Deep, long lasting friendships are built as guests share and
                  experience the "transformation" of living and sharing together
                  the "homey" serenity & simplicity—a "spirit" from the by-gone
                  days of "old Hawaii."
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-serif text-2xl font-light mb-8">
                {selectedRoom === "shared" ? "Shared Areas" : "Room Details"}
              </h3>
              {selectedRoom === "shared" ? (
                <div className="prose prose-lg text-muted-foreground leading-relaxed">
                  <p>
                    The Pu'uhonua House features beautiful shared spaces where
                    guests can gather, relax, and build community. These areas
                    include the living room with library, fully-equipped
                    kitchen, common areas, and the exterior spaces that showcase
                    the natural beauty of the property.
                  </p>
                </div>
              ) : (
                <div className="space-y-8">
                  {selectedRoom === "sunrise" && (
                    <div className="relative">
                      <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-primary to-primary/50"></div>
                      <div className="pl-8">
                        <h4 className="font-serif text-2xl font-light mb-4 text-foreground">
                          Sunrise Room
                        </h4>
                        <div className="space-y-3">
                          <p className="text-lg text-muted-foreground">
                            Sleeps 1-2 people • Morning light & garden views
                          </p>
                          <p className="text-muted-foreground leading-relaxed">
                            Wake up to the first rays of morning light streaming
                            through the windows, offering beautiful garden views
                            and a peaceful start to your day.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  {selectedRoom === "elegantTree" && (
                    <div className="relative">
                      <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-primary to-primary/50"></div>
                      <div className="pl-8">
                        <h4 className="font-serif text-2xl font-light mb-4 text-foreground">
                          Elegant Tree Tops Room
                        </h4>
                        <div className="space-y-3">
                          <p className="text-lg text-muted-foreground">
                            Sleeps 1-2 people • Elevated views of the canopy
                          </p>
                          <p className="text-muted-foreground leading-relaxed">
                            Experience the beauty of the forest canopy from this
                            elevated room, with stunning views of the treetops
                            and natural surroundings.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  {selectedRoom === "rainforest" && (
                    <div className="relative">
                      <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-primary to-primary/50"></div>
                      <div className="pl-8">
                        <h4 className="font-serif text-2xl font-light mb-4 text-foreground">
                          Rainforest Room
                        </h4>
                        <div className="space-y-3">
                          <p className="text-lg text-muted-foreground">
                            Sleeps 1 person • Intimate forest connection
                          </p>
                          <p className="text-muted-foreground leading-relaxed">
                            Immerse yourself in the lush rainforest environment
                            with this intimate room that offers a deep
                            connection to the natural world around you.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div>
              <h3 className="font-serif text-2xl font-light mb-8">
                Shared Amenities
              </h3>
              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-primary to-primary/50"></div>
                  <div className="pl-8">
                    <h4 className="font-serif text-xl font-light mb-2 text-foreground">
                      Large diverse library
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Extensive collection of books for quiet reading and study,
                      creating a peaceful space for contemplation and learning.
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-primary to-primary/50"></div>
                  <div className="pl-8">
                    <h4 className="font-serif text-xl font-light mb-2 text-foreground">
                      Fully-equipped kitchen
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Complete cooking facilities for shared meals, where guests
                      can prepare and enjoy food together in community.
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-primary to-primary/50"></div>
                  <div className="pl-8">
                    <h4 className="font-serif text-xl font-light mb-2 text-foreground">
                      Comfortable living room
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Cozy shared space for relaxation and community, where
                      lasting friendships are built through shared experiences.
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-primary to-primary/50"></div>
                  <div className="pl-8">
                    <h4 className="font-serif text-xl font-light mb-2 text-foreground">
                      Veranda with garden views
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Outdoor space overlooking the Hawaiian garden, where you
                      can connect with nature and enjoy the island's beauty.
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
                    $75/night
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
                    60-day maximum stay. Shared living spaces foster community
                    and lasting friendships.
                  </p>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90">
                  <Link href="/contact?accommodation=Pu'uhonua House">
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
              Hear from guests who have experienced the unique community spirit
              of Pu'uhonua House
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
                  "Our 'community house' - a sanctuary where deep friendships
                  are built. I am filled with gratitude for the friendships I
                  made and the comfort I found being in this very special
                  place."
                </blockquote>
                <cite className="text-sm font-medium text-primary not-italic">
                  — Deb Keyes, Harbor Springs, Michigan
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
                  "I remember sitting around the table in your kitchen with
                  Lisa, Dee and you and talking about our desire to live a
                  simpler life. Your life choices inspired me then and continue
                  to inspire me today."
                </blockquote>
                <cite className="text-sm font-medium text-primary not-italic">
                  — Marilyn
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
