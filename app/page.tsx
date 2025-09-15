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
  ChevronLeft,
  ChevronRight,
  X,
  Quote,
  Menu,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { openEmailClient, BookingInquiryData } from "@/lib/email";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [currentFacilityImages, setCurrentFacilityImages] = useState<string[]>(
    []
  );
  const [formData, setFormData] = useState<BookingInquiryData>({
    name: "",
    dates: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const slides = [
    {
      type: "video",
      video: "/homescreen/akiko-walking-stairs-trimmed.mp4",
      // poster: "/homescreen/akiko-stairs.JPG",
      title: "Aloha & Welcome",
      subtitle: "to Akiko's Buddhist Bed & Breakfast",
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

  const startTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6100);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [slides.length]);

  // Handle video play/pause when slide changes
  useEffect(() => {
    if (videoRef.current) {
      if (slides[currentSlide].type === "video") {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(console.error);
      } else {
        videoRef.current.pause();
      }
    }
  }, [currentSlide]);

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
    startTimer(); // Reset timer when manually changing slides
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    startTimer(); // Reset timer when manually changing slides
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name.trim() || !formData.message.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Open native email client with pre-filled form data
      openEmailClient(formData);

      // Reset form
      setFormData({
        name: "",
        dates: "",
        message: "",
      });
    } catch (error) {
      console.error("Error opening email client:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: "url('/homescreen/calligraphy-paper-bg-option.webp')",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center top",
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
              src="/images/AKIKOSwhitetext.png"
              alt="Akiko's Buddhist B&B"
              width={200}
              height={96}
              className="h-24 w-auto"
              priority
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
              href="#"
              className="text-white hover:text-white/80 transition-colors font-['Yuji_Boku'] border-b border-white/40"
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
              <a
                href="#"
                className="text-white hover:text-white/80 transition-colors font-['Yuji_Boku'] py-2 border-b border-white/40 pb-3"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#accommodations"
                className="text-white hover:text-white/80 transition-colors font-['Yuji_Boku'] py-2"
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
                <div className="w-full h-full">
                  <video
                    ref={videoRef}
                    muted
                    loop
                    playsInline
                    autoPlay
                    preload="auto"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: "center 40%" }}
                  >
                    <source src={slide.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : (
                <>
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `url('${slide.image}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center center",
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
          <h2 className="font-['Yuji_Boku'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-6 leading-tight">
            {slides[currentSlide].title}
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl font-light mb-8 leading-relaxed font-['Sawarabi_Mincho']">
            {slides[currentSlide].subtitle}
          </p>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentSlide(index);
                startTimer(); // Reset timer when clicking slide indicators
              }}
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
            "url('/homescreen/calligraphy-paper-bg.webp'), url('/homescreen/calligraphy-paper-bg-option.webp')",
          backgroundSize: "cover, cover",
          backgroundAttachment: "scroll, fixed",
          backgroundRepeat: "no-repeat, no-repeat",
          backgroundPosition: "center top, center top",
        }}
      >
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid sm:grid-cols-1 md:grid-cols-5 gap-8 sm:gap-12 items-center">
            <div className="md:col-span-3">
              <Image
                src="/homescreen/akiko-statue.JPG"
                alt="Buddha statue in the garden"
                width={600}
                height={400}
                className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg shadow-lg"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="md:col-span-2">
              <h3 className="font-['Yuji_Boku'] text-3xl sm:text-4xl font-light mb-6 text-foreground drop-shadow-sm">
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

        {/* Philosophy Section */}
        <div className="py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h3 className="font-['Yuji_Boku'] text-3xl sm:text-4xl font-light mb-8 text-foreground drop-shadow-sm">
              The Spirit of This Place
            </h3>
            <div className="prose prose-lg mx-auto text-foreground leading-relaxed drop-shadow-sm">
              <p className="text-lg sm:text-xl mb-6">
                {
                  "Our deep love for Hawaii flows through every moment here—its beauty, its human naturalness, its modesty and magnificent contrasts."
                }
              </p>
              <p className="text-base sm:text-lg mb-6">
                {
                  "Yin and yang dance together: the dynamic interplay of soft and hard, cold and hot, silky and bumpy, modest and wild. Here you'll find both yoga and zazen stillness, the rhythm of older Hawaii—slower, more humane."
                }
              </p>
              <p className="text-base sm:text-lg">
                {
                  "We welcome those whose lives could deepen and transform, who seek awakening to simplicity and authentic human connection. In gratitude to our ancestors and in service to all who come."
                }
              </p>
            </div>
          </div>
        </div>

        {/* Accommodations */}
        <div id="accommodations" className="py-20">
          <div className="container mx-auto px-4">
            <h3 className="font-['Yuji_Boku'] text-3xl sm:text-4xl font-light text-center mb-12 text-foreground">
              Accommodations
            </h3>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto">
              <Link href="/banana-patch">
                <Card
                  className="group overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer h-full flex flex-col bg-transparent rounded-none border-none shadow-none"
                  style={{
                    backgroundImage:
                      "url('/homescreen/calligraphy-paper-bg-option.webp')",
                    backgroundSize: "cover",
                    backgroundPosition: "top -6px center",
                  }}
                >
                  <div className="h-48 bg-muted bg-center mx-4 mt-4 relative overflow-hidden">
                    <Image
                      src="/images/banana-patch-exterior.avif"
                      alt="Banana Patch Cottage exterior"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                  <CardHeader className="flex-shrink-0 bg-transparent">
                    <CardTitle className="font-['Yuji_Boku'] group-hover:text-primary transition-colors duration-300">
                      Banana Patch Cottage
                    </CardTitle>
                    <CardDescription>
                      Cozy cottage in the Banana Patch forest for one person
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col bg-transparent">
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
                <Card
                  className="group overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer h-full flex flex-col bg-transparent rounded-none border-none shadow-none"
                  style={{
                    backgroundImage:
                      "url('/homescreen/calligraphy-paper-bg-option.webp')",
                    backgroundSize: "cover",
                    backgroundPosition: "top -6px center",
                  }}
                >
                  <div className="h-56 bg-muted bg-center mx-4 mt-4 relative overflow-hidden">
                    <Image
                      src="/mango/mango-exterior.jpeg"
                      alt="Mango Tree Cottage exterior"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                  <CardHeader className="flex-shrink-0 bg-transparent">
                    <CardTitle className="font-['Yuji_Boku'] group-hover:text-primary transition-colors duration-300">
                      Mango Tree Cottage
                    </CardTitle>
                    <CardDescription>
                      Roomy, airy cottage under giant mango tree for one or two
                      persons
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col bg-transparent">
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
                <Card
                  className="group overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer h-full flex flex-col bg-transparent rounded-none border-none shadow-none"
                  style={{
                    backgroundImage:
                      "url('/homescreen/calligraphy-paper-bg-option.webp')",
                    backgroundSize: "cover",
                    backgroundPosition: "top -6px center",
                  }}
                >
                  <div className="h-48 bg-muted bg-center mx-4 mt-4 relative overflow-hidden">
                    <Image
                      src="/puuhonua/puuhonua-exterior.avif"
                      alt="Pu'uhonua House exterior"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                  <CardHeader className="flex-shrink-0 bg-transparent">
                    <CardTitle className="font-['Yuji_Boku'] group-hover:text-primary transition-colors duration-300">
                      Pu'uhonua House
                    </CardTitle>
                    <CardDescription>
                      Private cozy bedrooms, shared bathrooms and full kitchen
                      in this classic "old Hawaiian" plantation home
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col bg-transparent">
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
                <Card
                  className="group overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer h-full flex flex-col bg-transparent rounded-none border-none shadow-none"
                  style={{
                    backgroundImage:
                      "url('/homescreen/calligraphy-paper-bg-option.webp')",
                    backgroundSize: "cover",
                    backgroundPosition: "top -6px center",
                  }}
                >
                  <div className="h-48 bg-muted bg-center mx-4 mt-4 relative overflow-hidden">
                    <Image
                      src="/images/hale-aloha-exterior.avif"
                      alt="Hale Aloha exterior"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                  <CardHeader className="flex-shrink-0 bg-transparent">
                    <CardTitle className="font-['Yuji_Boku'] group-hover:text-primary transition-colors duration-300">
                      Hale Aloha
                    </CardTitle>
                    <CardDescription>
                      Spacious & airy plantation style home with large picture
                      windows opening to beautiful flowers and gardens
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col bg-transparent">
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
          </div>
        </div>

        {/* Activities */}
        <div className="py-20">
          <div className="container mx-auto px-4">
            <h3 className="font-['Yuji_Boku'] text-3xl sm:text-4xl font-light text-center mb-12 text-foreground drop-shadow-sm">
              Activities & Experiences
            </h3>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 max-w-4xl mx-auto">
              <div className="space-y-8">
                <div>
                  <h4 className="font-serif text-xl font-medium mb-3 drop-shadow-sm">
                    Zazen Meditation
                  </h4>
                  <p className="text-foreground drop-shadow-sm">
                    Sit Zazen meditation Wednesday & Friday nights—7:00-8:15
                    p.m. in our peaceful meditation space.
                  </p>
                </div>

                <div>
                  <h4 className="font-serif text-xl font-medium mb-3 drop-shadow-sm">
                    Yoga & Tai Chi
                  </h4>
                  <p className="text-foreground drop-shadow-sm">
                    Practice restorative yoga 6-7:30pm Monday & Thursday, and
                    attend tai chi & chi gong classes at Hakalau Jodo Mission.
                  </p>
                </div>

                <div>
                  <h4 className="font-serif text-xl font-medium mb-3 drop-shadow-sm">
                    Japanese Folk Dance
                  </h4>
                  <p className="text-foreground drop-shadow-sm">
                    Join Japanese Folk dance practice and connect with the
                    cultural heritage of the islands.
                  </p>
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

        {/* Amenities */}
        <div className="py-20">
          <div className="container mx-auto px-4">
            <h3 className="font-['Yuji_Boku'] text-3xl sm:text-4xl font-light text-center mb-12 text-foreground">
              Sacred Amenities
            </h3>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
              {/* Yoga Studio */}
              <Link href="/facilities">
                <Card
                  className="group overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer rounded-none border-none shadow-none"
                  style={{
                    backgroundImage:
                      "url('/homescreen/calligraphy-paper-bg-option.webp')",
                    backgroundSize: "cover",
                    backgroundPosition: "top -9px center",
                  }}
                >
                  <div className="h-48 bg-muted bg-center mx-4 mt-4 relative overflow-hidden">
                    <Image
                      src="/facilities/yoga-studio/yoga-room.jpeg"
                      alt="Yoga Studio"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
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
                <Card
                  className="group overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer rounded-none border-none shadow-none"
                  style={{
                    backgroundImage:
                      "url('/homescreen/calligraphy-paper-bg-option.webp')",
                    backgroundSize: "cover",
                    backgroundPosition: "top -9px center",
                  }}
                >
                  <div className="h-48 bg-muted bg-center mx-4 mt-4 relative overflow-hidden">
                    <Image
                      src="/facilities/zendo/zendo-inside.jpg"
                      alt="Zendo meditation space"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
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
              <h4 className="font-['Sawarabi_Mincho'] text-xl sm:text-2xl font-light text-center mb-8 text-foreground">
                Two-Acre Tropical Paradise
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 max-w-6xl mx-auto">
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
                    <div className="h-32 sm:h-40 md:h-48 lg:h-56 bg-muted bg-center rounded-xl group-hover:scale-105 transition-transform duration-300 shadow-lg group-hover:shadow-xl relative overflow-hidden">
                      <Image
                        src={image}
                        alt="Grounds image"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    </div>
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

      {/* Guest Reviews Section */}
      <section
        className="py-20"
        style={{
          backgroundImage:
            "url('/homescreen/calligraphy-paper-bg.webp'), url('/homescreen/calligraphy-paper-bg-option.webp')",
          backgroundSize: "cover, cover",
          backgroundAttachment: "scroll, fixed",
          backgroundRepeat: "no-repeat, no-repeat",
          backgroundPosition: "center top, center top",
        }}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16" style={{ paddingTop: "7px" }}>
            <h3 className="font-['Yuji_Boku'] text-3xl sm:text-4xl font-light mb-6 text-foreground drop-shadow-sm">
              Guest Reflections
            </h3>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Voices from the hearts of those who have experienced the
              transformative power of this sacred sanctuary
            </p>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
            {/* Featured Review 1 */}
            <Card
              className="group border-none shadow-lg hover:shadow-xl transition-all duration-300"
              style={{
                backgroundImage:
                  "url('/homescreen/calligraphy-paper-bg-option.webp')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <CardContent className="p-8">
                <div className="mb-4">
                  <Quote className="h-8 w-8 text-primary/40" />
                </div>
                <blockquote className="text-base leading-relaxed text-foreground font-['Sawarabi_Mincho'] italic mb-6">
                  "To stay at Akiko's Buddhist B&B is to step into Old Hawai'i,
                  a place and time and way of life that is a wonder to discover.
                  The sounds of gentle wind chimes and waterfalls, the
                  fragrances of gardenia and meditation incense... invite a
                  feeling of reverence for life's simplest gifts."
                </blockquote>
                <cite className="text-sm font-medium text-primary not-italic font-['Yuji_Boku']">
                  — Katy Fogg
                </cite>
              </CardContent>
            </Card>

            {/* Featured Review 2 */}
            <Card
              className="group border-none shadow-lg hover:shadow-xl transition-all duration-300"
              style={{
                backgroundImage:
                  "url('/homescreen/calligraphy-paper-bg-option.webp')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <CardContent className="p-8">
                <div className="mb-4">
                  <Quote className="h-8 w-8 text-primary/40" />
                </div>
                <blockquote className="text-base leading-relaxed text-foreground font-['Sawarabi_Mincho'] italic mb-6">
                  "Being a guest at Akiko's Buddhist B&B is a blessing. The
                  surroundings support peace, love and a deep respect for the
                  beauty of the environment. It offered me a space for
                  reflection and an opportunity to 'slow down' the pace of my
                  busy life."
                </blockquote>
                <cite className="text-sm font-medium text-primary not-italic font-['Yuji_Boku']">
                  — Deb Keyes, Harbor Springs, Michigan
                </cite>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Link href="/reviews">
              <Button
                variant="outline"
                size="lg"
                className="font-['Yuji_Boku'] px-8 cursor-pointer bg-primary text-white border-primary hover:bg-primary/90 hover:border-primary/90 transition-colors"
              >
                Read All Guest Reflections →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20"
        style={{
          backgroundImage:
            "url('/homescreen/calligraphy-paper-bg.webp'), url('/homescreen/calligraphy-paper-bg-option.webp')",
          backgroundSize: "cover, cover",
          backgroundAttachment: "scroll, fixed",
          backgroundRepeat: "no-repeat, no-repeat",
          backgroundPosition: "center top, center top",
          minHeight: "100vh",
        }}
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <h3 className="font-['Yuji_Boku'] text-3xl sm:text-4xl font-light text-center mb-12 text-foreground">
            Connect With Us — Inquiry About Booking
          </h3>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            <div className="space-y-8">
              <div>
                <h4 className="font-['Yuji_Boku'] text-2xl font-medium mb-6">
                  Inquire About Booking
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <a
                      href="mailto:akikobandb@gmail.com?subject=Booking Inquiry"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      akikobandb@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <a
                      href="tel:+18089636422"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      (808) 963-6422
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">
                      Hakalau, Hamakua Coast, Hawaii
                    </span>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-sm text-foreground font-medium">
                    For reservations and inquiries, please call Akiko at{" "}
                    <a
                      href="tel:+18089636422"
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      (808) 963-6422
                    </a>{" "}
                    or fill out the booking inquiry form. She will help you find
                    the perfect retreat space for your stay.
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
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="form-field-container">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your name"
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-field-container">
                    <Label htmlFor="dates">Preferred Dates</Label>
                    <Input
                      id="dates"
                      name="dates"
                      value={formData.dates}
                      onChange={handleInputChange}
                      placeholder="When would you like to visit?"
                      className="form-input"
                    />
                  </div>
                  <div className="form-field-container">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your intentions for this retreat..."
                      className="min-h-[100px] form-textarea"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Opening Email..." : "Send Booking Inquiry"}
                  </Button>

                  <p className="text-sm text-muted-foreground text-center">
                    This will open your email client with a pre-filled message
                    to Akiko.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <footer className="py-12 mt-20">
          <div className="container mx-auto px-4 text-center">
            <div className="mb-6">
              <Image
                src="/akiko-black-logo.png"
                alt="Akiko's Buddhist B&B"
                width={200}
                height={96}
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
            <Image
              src={selectedImage}
              alt="Grounds image"
              width={1200}
              height={800}
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
              sizes="90vw"
            />
          </div>
        </div>
      )}
    </div>
  );
}
