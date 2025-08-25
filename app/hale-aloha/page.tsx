"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Wifi, Coffee, Leaf, Mountain, Users, Home, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function HaleAloha() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const images = [
    { src: "/images/hale-aloha-exterior.avif", alt: "Hale Aloha exterior - beautiful plantation-style home" },
    { src: "/images/hale-aloha-living-room.avif", alt: "Living room with large picture windows" },
    { src: "/images/hale-aloha-living-space.avif", alt: "Spacious living area with natural light" },
    { src: "/images/hale-aloha-bedroom-1.avif", alt: "Comfortable bedroom with natural lighting" },
    { src: "/images/hale-aloha-bedroom-2.avif", alt: "Second bedroom with plantation style charm" },
    { src: "/images/hale-aloha-kitchen.avif", alt: "Spacious kitchen cooled by trade winds" },
    { src: "/images/hale-aloha-dining.avif", alt: "Dining area with comfortable seating" },
    { src: "/images/hale-aloha-bathroom.avif", alt: "Clean, functional bathroom" },
    { src: "/images/hale-aloha-interior-1.avif", alt: "Interior hallway and living spaces" },
    { src: "/images/hale-aloha-interior-2.avif", alt: "Additional interior view" },
    { src: "/images/hale-aloha-interior-3.avif", alt: "Another interior perspective of the home" },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [images.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Buddhist B&B</span>
          </Link>
          <div className="flex items-center gap-4">
            <img src="/images/akiko-full-logo.png" alt="Akiko's Buddhist B&B" className="h-10 w-auto" />
          </div>
        </div>
      </header>

      <section className="relative h-96">
        <div className="relative w-full h-full overflow-hidden">
          <img
            src={images[currentSlide].src || "/placeholder.svg"}
            alt={images[currentSlide].alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />

          {/* Navigation buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Slide indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentSlide ? "bg-white" : "bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="font-serif text-5xl font-light mb-4">Hale Aloha</h1>
            <p className="text-xl">Home of Aloha and Warmth</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="font-serif text-3xl font-light mb-6">Elegance & Charm of Old Hawaii</h2>
              <div className="prose prose-lg text-muted-foreground leading-relaxed space-y-4">
                <p>
                  Hale Aloha, Home of Aloha and Warmth, is a beautiful 3 bedroom, 1½ bath home, surrounded by flowers
                  and fruit trees. The living room "breathes" a quiet serenity and a settled, eloquent beauty.
                </p>
                <p>
                  The large picture windows of this gracious older-style home open up to a lush and wild and abundant
                  Hawaii. A spacious style kitchen, cooled by ocean trade winds, encourages "casual stillness" and a
                  return to simplicity.
                </p>
                <p>
                  Return to "human rhythm;" return to the elegance and charm of "old Hawaii." Sleeps up to 4 people on
                  Retreat and Refuge. Guests are encouraged to stay a month. Settle deeply, experience the peace and
                  beauty of our beloved Hawaii.
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-serif text-2xl font-light mb-4">Private Home Features</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Home className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">3 bedrooms, 1½ bath</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mountain className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">Large picture windows</span>
                </div>
                <div className="flex items-center gap-3">
                  <Coffee className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">Spacious kitchen</span>
                </div>
                <div className="flex items-center gap-3">
                  <Leaf className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">Surrounded by gardens</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">Sleeps up to 4 people</span>
                </div>
                <div className="flex items-center gap-3">
                  <Wifi className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">High-speed WiFi (44 Mbps)</span>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 p-6 rounded-lg">
              <h4 className="font-serif text-lg font-medium mb-3">Perfect for Extended Stays</h4>
              <p className="text-muted-foreground">
                This private home is ideal for those seeking a longer retreat experience. With full amenities and the
                space to truly settle in, Hale Aloha offers the perfect environment for deep transformation and
                connection with Hawaii's natural rhythms.
              </p>
            </div>
          </div>

          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="font-serif text-2xl">Rates & Booking</CardTitle>
                <CardDescription>All rates plus tax</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">$150/night</div>
                  <p className="text-sm text-muted-foreground">Single occupancy</p>
                  <div className="text-xl font-semibold text-primary mt-2">+$35/night</div>
                  <p className="text-sm text-muted-foreground">Each additional person</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">7 nights minimum</span>
                    <span className="text-sm font-medium">Base rate</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">2+ weeks</span>
                    <span className="text-sm font-medium text-green-600">15% discount</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">1+ month</span>
                    <span className="text-sm font-medium text-green-600">30% discount</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <p className="text-xs text-muted-foreground mb-4">
                    Private home for up to 4 guests. High-speed WiFi included. Monthly stays encouraged for deeper
                    transformation.
                  </p>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90">
                  <a href="/#contact">Book Your Home Away From Home</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
