"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  Phone,
  MapPin,
  Leaf,
  Mountain,
  Waves,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [currentFacilityImages, setCurrentFacilityImages] = useState<string[]>(
    []
  );
  const slides = [
    {
      type: "video",
      video: "/homescreen/akiko-stair-walking.mp4",
      poster: "/homescreen/akiko-stairs.JPG",
      title: "Aloha & Welcome",
      subtitle: "Where ancient wisdom meets island tranquility",
    },
    {
      type: "image",
      image: "/homescreen/jungle1.JPG",
      title: "Sacred Sanctuary",
      subtitle: "Where ancient wisdom meets island tranquility",
      imageStyle: "object-cover",
    },
    {
      type: "image",
      image: "/images/buddha-statue.png",
      title: "Grounded Simplicity",
      subtitle: `Learn to dance with the slower rhythms of an 'older' Hawaiʻi`,
      imageStyle: "object-cover",
    },
    {
      type: "image",
      image: "/homescreen/red-flower.JPG",
      title: "Deep Connection",
      subtitle: `Immerse authentically in Hawaiʻi's sacred ʻāina (land) as well as those you encounter`,
      imageStyle: "object-cover",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

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
              href="#"
              className="text-white hover:text-white/80 transition-colors font-['Yuji_Boku']"
            >
              Home
            </a>
            <a
              href="#accommodations"
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

      {/* Hero Section with Slideshow */}
      <section className="relative h-[88vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              {slide.type === "video" ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "center 40%" }}
                  poster={slide.poster}
                >
                  <source src={slide.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <>
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `url('${slide.image}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40" />
                </>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h2 className="font-['Yuji_Boku'] text-5xl md:text-7xl font-light mb-6 leading-tight">
            {slides[currentSlide].title}
          </h2>
          <p className="text-xl md:text-2xl font-light mb-8 leading-relaxed font-['Sawarabi_Mincho']">
            {slides[currentSlide].subtitle}
          </p>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* About Akiko Section */}
      <section
        id="about"
        className="py-20"
        style={{
          backgroundImage:
            "url('/homescreen/calligraphy-paper-bg.png'), url('/homescreen/calligraphy-paper-bg-option.png')",
          backgroundSize: "cover, cover",
          backgroundAttachment: "scroll, fixed",
          backgroundRepeat: "no-repeat, no-repeat",
          backgroundPosition: "center top, center top",
        }}
      >
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-5 gap-12 items-center">
            <div className="md:col-span-3">
              <img
                src="/homescreen/akiko-statue.JPG"
                alt="Buddha statue in the garden"
                className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="md:col-span-2">
              <h3 className="font-['Yuji_Boku'] text-4xl font-light mb-6 text-foreground drop-shadow-sm">
                About Akiko
              </h3>
              <div className="prose prose-lg text-foreground leading-relaxed space-y-4 drop-shadow-sm">
                <p>
                  Thank you very much for visiting with us. Akiko's Buddhist Bed
                  & Breakfast is located along the lush and tropical Hamakua
                  Coast, 15 miles north of Hilo.
                </p>
                <p>
                  Akiko Masuda, host and owner, is a 3rd generation Japanese
                  woman, born in Honolulu in the 40's, long before freeways,
                  shopping malls, email, cell phones and hand held devices. She
                  is a writer of children's books, student of tai chi, yoga and
                  zen meditation.
                </p>
                <p>
                  Akiko has been living in Wailea Village since '91, the first
                  person to buy in this quiet, peaceful country village in 35
                  years. Wailea is a wee, still-intact, plantation village with
                  about 12 households which have seen very little change—a
                  fleeting flashback in time. Please come and discover the peace
                  and kindness here.
                </p>
                <p className="text-sm text-muted-foreground italic mt-4">
                  <a
                    href="https://www.youtube.com/watch?v=toee4I0AhaE"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 underline"
                  >
                    Watch the trailer for "August at Akiko's"
                  </a>{" "}
                  — a film that was shot right here at our property, capturing
                  the unique spirit of this special place.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Philosophy Section - Mobile: separate, Desktop: combined */}
        <div className="py-20 md:py-20 lg:py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h3 className="font-['Yuji_Boku'] text-4xl font-light mb-8 text-foreground drop-shadow-sm">
              The Spirit of This Place
            </h3>
            <div className="prose prose-lg mx-auto text-foreground leading-relaxed drop-shadow-sm">
              <p className="text-xl mb-6">
                {
                  "Our deep love for Hawaii flows through every moment here—its beauty, its human naturalness, its modesty and magnificent contrasts."
                }
              </p>
              <p className="text-lg mb-6">
                {
                  "Yin and yang dance together: the dynamic interplay of soft and hard, cold and hot, silky and bumpy, modest and wild. Here you'll find both yoga and zazen stillness, the rhythm of older Hawaii—slower, more humane."
                }
              </p>
              <p className="text-lg">
                {
                  "We welcome those whose lives could deepen and transform, who seek awakening to simplicity and authentic human connection. In gratitude to our ancestors and in service to all who come."
                }
              </p>
            </div>
          </div>
        </div>

        {/* Accommodations */}
        <div className="py-20">
          <div className="container mx-auto px-4">
            <h3 className="font-['Yuji_Boku'] text-4xl font-light text-center mb-12 text-foreground">
              Accommodations
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Link href="/banana-patch">
                <Card className="group overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer bg-white/70 backdrop-blur-sm border border-white/20 hover:border-primary/20 h-full flex flex-col">
                  <div
                    className="h-48 bg-muted bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                    style={{
                      backgroundImage:
                        "url('/images/banana-patch-exterior.avif')",
                    }}
                  />
                  <CardHeader className="flex-shrink-0">
                    <CardTitle className="font-['Yuji_Boku'] group-hover:text-primary transition-colors duration-300">
                      Banana Patch Cottage
                    </CardTitle>
                    <CardDescription>
                      Cozy cottage in the Banana Patch forest for one person
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col">
                    <p className="text-sm text-muted-foreground mb-4">
                      Intimately nestled in a grove of banana trees. Hear the
                      winds, rain dancing on the tin roof, and falling mangoes
                      when in season.
                    </p>
                    <div className="mt-auto">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-lg font-semibold text-primary">
                          From $75/night
                        </div>
                        <div className="text-primary/60 group-hover:text-primary transition-colors duration-300 text-sm font-medium">
                          Learn More →
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        7 night minimum • Shared kitchen & bath
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/mango-tree">
                <Card className="group overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer bg-white/70 backdrop-blur-sm border border-white/20 hover:border-primary/20 h-full flex flex-col">
                  <div
                    className="h-48 bg-muted bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                    style={{
                      backgroundImage:
                        "url('/images/mango-tree-exterior.avif')",
                    }}
                  />
                  <CardHeader className="flex-shrink-0">
                    <CardTitle className="font-['Yuji_Boku'] group-hover:text-primary transition-colors duration-300">
                      Mango Tree Cottage
                    </CardTitle>
                    <CardDescription>
                      Roomy, airy cottage under giant mango tree for one or two
                      persons
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col">
                    <p className="text-sm text-muted-foreground mb-4">
                      16 x 24 screened studio space, completely open to the
                      outdoors. Experience living harmony: being outdoors and
                      indoors simultaneously.
                    </p>
                    <div className="mt-auto">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-lg font-semibold text-primary">
                          From $85/night
                        </div>
                        <div className="text-primary/60 group-hover:text-primary transition-colors duration-300 text-sm font-medium">
                          Learn More →
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        7 night minimum • Queen bed • Shared kitchen & bath
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/puuhonua-house">
                <Card className="group overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer bg-white/70 backdrop-blur-sm border border-white/20 hover:border-primary/20 h-full flex flex-col">
                  <div
                    className="h-48 bg-muted bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                    style={{
                      backgroundImage: "url('/images/puuhonua-exterior.avif')",
                    }}
                  />
                  <CardHeader className="flex-shrink-0">
                    <CardTitle className="font-['Yuji_Boku'] group-hover:text-primary transition-colors duration-300">
                      Pu'uhonua House
                    </CardTitle>
                    <CardDescription>
                      Private cozy bedrooms, shared bathrooms and full kitchen
                      in this classic "old Hawaiian" plantation home
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col">
                    <p className="text-sm text-muted-foreground mb-4">
                      Our "community house" - a sanctuary where deep friendships
                      are built. 4-bedroom, 2-story classic with veranda
                      overlooking Hawaiian garden.
                    </p>
                    <div className="mt-auto">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-lg font-semibold text-primary">
                          From $75/night
                        </div>
                        <div className="text-primary/60 group-hover:text-primary transition-colors duration-300 text-sm font-medium">
                          Learn More →
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        7 night minimum • Shared spaces • 3 rooms available
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/hale-aloha">
                <Card className="group overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer bg-white/70 backdrop-blur-sm border border-white/20 hover:border-primary/20 h-full flex flex-col">
                  <div
                    className="h-48 bg-muted bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                    style={{
                      backgroundImage:
                        "url('/images/hale-aloha-exterior.avif')",
                    }}
                  />
                  <CardHeader className="flex-shrink-0">
                    <CardTitle className="font-['Yuji_Boku'] group-hover:text-primary transition-colors duration-300">
                      Hale Aloha
                    </CardTitle>
                    <CardDescription>
                      Spacious & airy plantation style home with large picture
                      windows opening to beautiful flowers and gardens
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col">
                    <p className="text-sm text-muted-foreground mb-4">
                      Home of Aloha and Warmth. Beautiful 3-bedroom, 1½ bath
                      home surrounded by flowers and fruit trees. Sleeps up to 4
                      people.
                    </p>
                    <div className="mt-auto">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-lg font-semibold text-primary">
                          From $150/night
                        </div>
                        <div className="text-primary/60 group-hover:text-primary transition-colors duration-300 text-sm font-medium">
                          Learn More →
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        7 night minimum • Up to 4 guests • Private home
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>

            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">
                All accommodations include high-speed WiFi and access to
                meditation spaces
              </p>
              <p className="text-sm text-muted-foreground">
                Discounts available for 2+ week stays (15%) and monthly stays
                (30%)
              </p>
            </div>
          </div>
        </div>

        {/* Activities */}
        <div className="py-20">
          <div className="container mx-auto px-4">
            <h3 className="font-['Yuji_Boku'] text-4xl font-light text-center mb-12 text-foreground drop-shadow-sm">
              Activities & Experiences
            </h3>
            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Leaf className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl font-medium mb-2 drop-shadow-sm">
                      Zazen Meditation
                    </h4>
                    <p className="text-foreground drop-shadow-sm">
                      Sit Zazen meditation Wednesday & Friday nights—7:00-8:15
                      p.m. in our peaceful meditation space.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Mountain className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl font-medium mb-2 drop-shadow-sm">
                      Yoga & Tai Chi
                    </h4>
                    <p className="text-foreground drop-shadow-sm">
                      Practice restorative yoga 6-7:30pm Monday & Thursday, and
                      attend tai chi & chi gong classes at Hakalau Jodo Mission.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Waves className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl font-medium mb-2 drop-shadow-sm">
                      Japanese Folk Dance
                    </h4>
                    <p className="text-foreground drop-shadow-sm">
                      Join Japanese Folk dance practice and connect with the
                      cultural heritage of the islands.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-serif text-xl font-medium mb-4 drop-shadow-sm">
                    Community Activities
                  </h4>
                  <ul className="space-y-2 text-foreground drop-shadow-sm">
                    <li>• Hakalau Farmers Market & FoodSHARE</li>
                    <li>• Work in the gardens on 2-acre grounds</li>
                    <li>• Occasional dinners and movies with guests</li>
                    <li>• Explore the citrus orchard and breadfruit grove</li>
                    <li>• Island exploration and cultural sites</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-serif text-xl font-medium mb-4 drop-shadow-sm">
                    The Hamakua Coast
                  </h4>
                  <p className="text-foreground mb-4 drop-shadow-sm">
                    The drive to Akiko's on Highway 19 is a colorful panorama of
                    small plantation communities with small rusted tin roof
                    houses, mom and pop stores, sweeping ocean vistas,
                    farmlands, pastures, rushing streams and breathtaking
                    waterfalls.
                  </p>
                  <p className="text-foreground drop-shadow-sm">
                    All that make our Hamakua Coast so extraordinary: a Special
                    Place, whose spirit, cultural history, values, land, and
                    peoples are honored and perpetuated.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Facilities & Grounds */}
        <div className="py-20">
          <div className="container mx-auto px-4">
            <h3 className="font-['Yuji_Boku'] text-4xl font-light text-center mb-12 text-foreground">
              Sacred Facilities & Grounds
            </h3>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Yoga Studio */}
              <Link href="/facilities">
                <Card className="group overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer bg-white/70 backdrop-blur-sm border border-white/20 hover:border-primary/20">
                  <div
                    className="h-48 bg-muted bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                    style={{
                      backgroundImage:
                        "url('/facilities/yoga-studio/yoga-room.jpeg')",
                    }}
                  />
                  <CardHeader>
                    <CardTitle className="font-['Yuji_Boku'] group-hover:text-primary transition-colors duration-300">
                      Yoga Studio
                    </CardTitle>
                    <CardDescription>
                      Spacious movement and meditation space
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Large, open studio with wooden floors and natural
                      lighting, perfect for yoga, tai chi, and movement
                      practices. Features exposed beam ceiling and views of
                      tropical gardens.
                    </p>
                    <div className="mt-4 text-primary/60 group-hover:text-primary transition-colors duration-300 text-sm font-medium">
                      View All Facilities →
                    </div>
                  </CardContent>
                </Card>
              </Link>

              {/* Zendo */}
              <Link href="/facilities">
                <Card className="group overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer bg-white/70 backdrop-blur-sm border border-white/20 hover:border-primary/20">
                  <div
                    className="h-48 bg-muted bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                    style={{
                      backgroundImage:
                        "url('/facilities/zendo/zendo-inside.jpg')",
                    }}
                  />
                  <CardHeader>
                    <CardTitle className="font-['Yuji_Boku'] group-hover:text-primary transition-colors duration-300">
                      Zendo
                    </CardTitle>
                    <CardDescription>Sacred meditation space</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Traditional meditation hall for zazen practice and quiet
                      contemplation. A serene space designed for deep spiritual
                      practice and group meditation sessions.
                    </p>
                    <div className="mt-4 text-primary/60 group-hover:text-primary transition-colors duration-300 text-sm font-medium">
                      View All Facilities →
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>

            <div className="mt-16">
              <h4 className="font-['Sawarabi_Mincho'] text-2xl font-light text-center mb-8 text-foreground">
                Two-Acre Tropical Paradise
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
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
              <p className="text-center text-muted-foreground mt-6 max-w-3xl mx-auto">
                Wander through our lush tropical gardens featuring native
                Hawaiian plants, fruit trees, and peaceful pathways. The grounds
                include citrus orchards, breadfruit groves, and countless quiet
                spots for reflection and connection with nature.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section - Mobile Only */}
      <section
        id="philosophy"
        className="py-20 md:hidden"
        style={{
          backgroundImage:
            "url('/homescreen/calligraphy-paper-bg.png'), url('/homescreen/calligraphy-paper-bg-option.png')",
          backgroundSize: "cover, cover",
          backgroundAttachment: "scroll, fixed",
          backgroundRepeat: "no-repeat, no-repeat",
          backgroundPosition: "center top, center top",
        }}
      >
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h3 className="font-['Yuji_Boku'] text-4xl font-light mb-8 text-foreground drop-shadow-sm">
            The Spirit of This Place
          </h3>
          <div className="prose prose-lg mx-auto text-foreground leading-relaxed drop-shadow-sm">
            <p className="text-xl mb-6">
              {
                "Our deep love for Hawaii flows through every moment here—its beauty, its human naturalness, its modesty and magnificent contrasts."
              }
            </p>
            <p className="text-lg mb-6">
              {
                "Yin and yang dance together: the dynamic interplay of soft and hard, cold and hot, silky and bumpy, modest and wild. Here you'll find both yoga and zazen stillness, the rhythm of older Hawaii—slower, more humane."
              }
            </p>
            <p className="text-lg">
              {
                "We welcome those whose lives could deepen and transform, who seek awakening to simplicity and authentic human connection. In gratitude to our ancestors and in service to all who come."
              }
            </p>
          </div>
        </div>
      </section>

      {/* Accommodations - Mobile Only */}
      <section
        id="accommodations"
        className="py-20 md:hidden"
        style={{
          backgroundImage:
            "url('/homescreen/calligraphy-paper-bg.png'), url('/homescreen/calligraphy-paper-bg-option.png')",
          backgroundSize: "cover, cover",
          backgroundAttachment: "scroll, fixed",
          backgroundRepeat: "no-repeat, no-repeat",
          backgroundPosition: "center top, center top",
        }}
      >
        <div className="container mx-auto px-4">
          <h3 className="font-['Yuji_Boku'] text-4xl font-light text-center mb-12 text-foreground">
            Accommodations
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Link href="/banana-patch">
              <Card className="group overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer bg-white/70 backdrop-blur-sm border border-white/20 hover:border-primary/20 h-full flex flex-col">
                <div
                  className="h-48 bg-muted bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                  style={{
                    backgroundImage:
                      "url('/images/banana-patch-exterior.avif')",
                  }}
                />
                <CardHeader className="flex-shrink-0">
                  <CardTitle className="font-['Yuji_Boku'] group-hover:text-primary transition-colors duration-300">
                    Banana Patch Cottage
                  </CardTitle>
                  <CardDescription>
                    Cozy cottage in the Banana Patch forest for one person
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <p className="text-sm text-muted-foreground mb-4">
                    Intimately nestled in a grove of banana trees. Hear the
                    winds, rain dancing on the tin roof, and falling mangoes
                    when in season.
                  </p>
                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-lg font-semibold text-primary">
                        From $75/night
                      </div>
                      <div className="text-primary/60 group-hover:text-primary transition-colors duration-300 text-sm font-medium">
                        Learn More →
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      7 night minimum • Shared kitchen & bath
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/mango-tree">
              <Card className="group overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer bg-white/70 backdrop-blur-sm border border-white/20 hover:border-primary/20 h-full flex flex-col">
                <div
                  className="h-48 bg-muted bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                  style={{
                    backgroundImage: "url('/images/mango-tree-exterior.avif')",
                  }}
                />
                <CardHeader className="flex-shrink-0">
                  <CardTitle className="font-['Yuji_Boku'] group-hover:text-primary transition-colors duration-300">
                    Mango Tree Cottage
                  </CardTitle>
                  <CardDescription>
                    Roomy, airy cottage under giant mango tree for one or two
                    persons
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <p className="text-sm text-muted-foreground mb-4">
                    16 x 24 screened studio space, completely open to the
                    outdoors. Experience living harmony: being outdoors and
                    indoors simultaneously.
                  </p>
                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-lg font-semibold text-primary">
                        From $85/night
                      </div>
                      <div className="text-primary/60 group-hover:text-primary transition-colors duration-300 text-sm font-medium">
                        Learn More →
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      7 night minimum • Queen bed • Shared kitchen & bath
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/puuhonua-house">
              <Card className="group overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer bg-white/70 backdrop-blur-sm border border-white/20 hover:border-primary/20 h-full flex flex-col">
                <div
                  className="h-48 bg-muted bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                  style={{
                    backgroundImage: "url('/images/puuhonua-exterior.avif')",
                  }}
                />
                <CardHeader className="flex-shrink-0">
                  <CardTitle className="font-['Yuji_Boku'] group-hover:text-primary transition-colors duration-300">
                    Pu'uhonua House
                  </CardTitle>
                  <CardDescription>
                    Private cozy bedrooms, shared bathrooms and full kitchen in
                    this classic "old Hawaiian" plantation home
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <p className="text-sm text-muted-foreground mb-4">
                    Our "community house" - a sanctuary where deep friendships
                    are built. 4-bedroom, 2-story classic with veranda
                    overlooking Hawaiian garden.
                  </p>
                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-lg font-semibold text-primary">
                        From $75/night
                      </div>
                      <div className="text-primary/60 group-hover:text-primary transition-colors duration-300 text-sm font-medium">
                        Learn More →
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      7 night minimum • Shared spaces • 3 rooms available
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/hale-aloha">
              <Card className="group overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer bg-white/70 backdrop-blur-sm border border-white/20 hover:border-primary/20 h-full flex flex-col">
                <div
                  className="h-48 bg-muted bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                  style={{
                    backgroundImage: "url('/images/hale-aloha-exterior.avif')",
                  }}
                />
                <CardHeader className="flex-shrink-0">
                  <CardTitle className="font-['Yuji_Boku'] group-hover:text-primary transition-colors duration-300">
                    Hale Aloha
                  </CardTitle>
                  <CardDescription>
                    Spacious & airy plantation style home with large picture
                    windows opening to beautiful flowers and gardens
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <p className="text-sm text-muted-foreground mb-4">
                    Home of Aloha and Warmth. Beautiful 3-bedroom, 1½ bath home
                    surrounded by flowers and fruit trees. Sleeps up to 4
                    people.
                  </p>
                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-lg font-semibold text-primary">
                        From $150/night
                      </div>
                      <div className="text-primary/60 group-hover:text-primary transition-colors duration-300 text-sm font-medium">
                        Learn More →
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      7 night minimum • Up to 4 guests • Private home
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              All accommodations include high-speed WiFi and access to
              meditation spaces
            </p>
            <p className="text-sm text-muted-foreground">
              Discounts available for 2+ week stays (15%) and monthly stays
              (30%)
            </p>
          </div>
        </div>
      </section>

      {/* Activities - Mobile Only */}
      <section
        id="activities"
        className="py-20 md:hidden"
        style={{
          backgroundImage:
            "url('/homescreen/calligraphy-paper-bg.png'), url('/homescreen/calligraphy-paper-bg-option.png')",
          backgroundSize: "cover, cover",
          backgroundAttachment: "scroll, fixed",
          backgroundRepeat: "no-repeat, no-repeat",
          backgroundPosition: "center top, center top",
        }}
      >
        <div className="container mx-auto px-4">
          <h3 className="font-['Yuji_Boku'] text-4xl font-light text-center mb-12 text-foreground drop-shadow-sm">
            Activities & Experiences
          </h3>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Leaf className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-serif text-xl font-medium mb-2 drop-shadow-sm">
                    Zazen Meditation
                  </h4>
                  <p className="text-foreground drop-shadow-sm">
                    Sit Zazen meditation Wednesday & Friday nights—7:00-8:15
                    p.m. in our peaceful meditation space.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Mountain className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-serif text-xl font-medium mb-2 drop-shadow-sm">
                    Yoga & Tai Chi
                  </h4>
                  <p className="text-foreground drop-shadow-sm">
                    Practice restorative yoga 6-7:30pm Monday & Thursday, and
                    attend tai chi & chi gong classes at Hakalau Jodo Mission.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Waves className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-serif text-xl font-medium mb-2 drop-shadow-sm">
                    Japanese Folk Dance
                  </h4>
                  <p className="text-foreground drop-shadow-sm">
                    Join Japanese Folk dance practice and connect with the
                    cultural heritage of the islands.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-serif text-xl font-medium mb-4 drop-shadow-sm">
                  Community Activities
                </h4>
                <ul className="space-y-2 text-foreground drop-shadow-sm">
                  <li>• Hakalau Farmers Market & FoodSHARE</li>
                  <li>• Work in the gardens on 2-acre grounds</li>
                  <li>• Occasional dinners and movies with guests</li>
                  <li>• Explore the citrus orchard and breadfruit grove</li>
                  <li>• Island exploration and cultural sites</li>
                </ul>
              </div>

              <div>
                <h4 className="font-serif text-xl font-medium mb-4 drop-shadow-sm">
                  The Hamakua Coast
                </h4>
                <p className="text-foreground mb-4 drop-shadow-sm">
                  The drive to Akiko's on Highway 19 is a colorful panorama of
                  small plantation communities with small rusted tin roof
                  houses, mom and pop stores, sweeping ocean vistas, farmlands,
                  pastures, rushing streams and breathtaking waterfalls.
                </p>
                <p className="text-foreground drop-shadow-sm">
                  All that make our Hamakua Coast so extraordinary: a Special
                  Place, whose spirit, cultural history, values, land, and
                  peoples are honored and perpetuated.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities - Mobile Only */}
      <section
        id="facilities"
        className="py-20 md:hidden"
        style={{
          backgroundImage:
            "url('/homescreen/calligraphy-paper-bg.png'), url('/homescreen/calligraphy-paper-bg-option.png')",
          backgroundSize: "cover, cover",
          backgroundAttachment: "scroll, fixed",
          backgroundRepeat: "no-repeat, no-repeat",
          backgroundPosition: "center top, center top",
        }}
      >
        <div className="container mx-auto px-4">
          <h3 className="font-['Yuji_Boku'] text-4xl font-light text-center mb-12 text-foreground">
            Sacred Facilities & Grounds
          </h3>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Yoga Studio */}
            <Link href="/facilities">
              <Card className="group overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer bg-white/70 backdrop-blur-sm border border-white/20 hover:border-primary/20">
                <div
                  className="h-48 bg-muted bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                  style={{
                    backgroundImage:
                      "url('/facilities/yoga-studio/yoga-room.jpeg')",
                  }}
                />
                <CardHeader>
                  <CardTitle className="font-['Yuji_Boku'] group-hover:text-primary transition-colors duration-300">
                    Yoga Studio
                  </CardTitle>
                  <CardDescription>
                    Spacious movement and meditation space
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Large, open studio with wooden floors and natural lighting,
                    perfect for yoga, tai chi, and movement practices. Features
                    exposed beam ceiling and views of tropical gardens.
                  </p>
                  <div className="mt-4 text-primary/60 group-hover:text-primary transition-colors duration-300 text-sm font-medium">
                    View All Facilities →
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Zendo */}
            <Link href="/facilities">
              <Card className="group overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer bg-white/70 backdrop-blur-sm border border-white/20 hover:border-primary/20">
                <div
                  className="h-48 bg-muted bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                  style={{
                    backgroundImage:
                      "url('/facilities/zendo/zendo-inside.jpg')",
                  }}
                />
                <CardHeader>
                  <CardTitle className="font-['Yuji_Boku'] group-hover:text-primary transition-colors duration-300">
                    Zendo
                  </CardTitle>
                  <CardDescription>Sacred meditation space</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Traditional meditation hall for zazen practice and quiet
                    contemplation. A serene space designed for deep spiritual
                    practice and group meditation sessions.
                  </p>
                  <div className="mt-4 text-primary/60 group-hover:text-primary transition-colors duration-300 text-sm font-medium">
                    View All Facilities →
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          <div className="mt-16">
            <h4 className="font-['Sawarabi_Mincho'] text-2xl font-light text-center mb-8 text-foreground">
              Two-Acre Tropical Paradise
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
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
            <p className="text-center text-muted-foreground mt-6 max-w-3xl mx-auto">
              Wander through our lush tropical gardens featuring native Hawaiian
              plants, fruit trees, and peaceful pathways. The grounds include
              citrus orchards, breadfruit groves, and countless quiet spots for
              reflection and connection with nature.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20"
        style={{
          backgroundImage:
            "url('/homescreen/calligraphy-paper-bg.png'), url('/homescreen/calligraphy-paper-bg-option.png')",
          backgroundSize: "cover, cover",
          backgroundAttachment: "scroll, fixed",
          backgroundRepeat: "no-repeat, no-repeat",
          backgroundPosition: "center top, center top",
          minHeight: "100vh",
        }}
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <h3 className="font-['Yuji_Boku'] text-4xl font-light text-center mb-12 text-foreground">
            Connect With Us — Inquiry About Booking
          </h3>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h4 className="font-['Yuji_Boku'] text-2xl font-medium mb-6">
                  Inquire About Booking
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">
                      akikobandb@gmail.com
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">
                      (808) 963-6422
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">
                      Hakalau, Hamakua Coast, Hawaii
                    </span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                  <p className="text-sm text-foreground font-medium">
                    For reservations and inquiries, please call Akiko at (808)
                    963-6422 or fill out the booking inquiry form. She will help
                    you find the perfect retreat space for your stay.
                  </p>
                </div>
              </div>

              <div>
                <h5 className="font-['Sawarabi_Mincho'] text-lg font-medium mb-3">
                  A Special Place
                </h5>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Located in Wailea Village, a quiet, peaceful country
                  plantation village that has seen very little change—a fleeting
                  flashback in time. The spirit, cultural history, values, land,
                  and peoples are honored and perpetuated through our community.
                </p>
              </div>
            </div>

            <Card className="bg-white/70 backdrop-blur-sm border border-white/20">
              <CardHeader>
                <CardTitle className="font-['Yuji_Boku']">
                  Send a Booking Inquiry
                </CardTitle>
                <CardDescription>
                  {
                    "Please contact Akiko directly for reservations. Use this form to send your booking inquiry and preferred dates."
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="dates">Preferred Dates</Label>
                  <Input
                    id="dates"
                    placeholder="When would you like to visit?"
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your intentions for this retreat..."
                    className="min-h-[100px]"
                  />
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Send Booking Inquiry
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <footer className="py-12 mt-20">
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
              alt="Grounds image"
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
