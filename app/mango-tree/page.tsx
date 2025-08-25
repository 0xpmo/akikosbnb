"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Wifi, Coffee, Leaf, Mountain, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function MangoTreeCottage() {
  const images = [
    { src: "/images/mango-tree-exterior.avif", alt: "Mango Tree Cottage exterior with screened walls" },
    {
      src: "/images/mango-tree-garden-path.jpeg",
      alt: "Tropical garden path with red anthurium flowers leading to cottage",
    },
    { src: "/images/mango-tree-interior-1.avif", alt: "Interior view showing bed and screened open-air design" },
    { src: "/images/mango-tree-interior-2.avif", alt: "Another interior view of the airy cottage space" },
    { src: "/images/mango-tree-amenities.avif", alt: "Shared bathroom and kitchenette facilities" },
    {
      src: "/images/mango-tree-meditation-room.avif",
      alt: "Morning sun streaming into Puja/Prayer meditation room under ancient guava tree",
    },
  ]

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
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
            src={images[currentImageIndex].src || "/placeholder.svg"}
            alt={images[currentImageIndex].alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />

          {/* Navigation buttons */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>

          {/* Image indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentImageIndex ? "bg-white" : "bg-white/50"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="font-serif text-5xl font-light mb-4">Mango Tree Cottage</h1>
            <p className="text-xl">Living harmony under the giant mango</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="font-serif text-3xl font-light mb-6">Being Outdoors, Being Indoors, Simultaneously</h2>
              <div className="prose prose-lg text-muted-foreground leading-relaxed space-y-4">
                <p>
                  The Mango Tree Cottage is a 16 x 24 screened studio space, completely open to the outdoors. Listen to
                  the winds, rain "dancing" on the tin roof, crickets, falling avocados and ripe mangoes when in season.
                </p>
                <p>
                  A comfortable reading chair, table for work or eating, and a gracious queen size bed—basic—offering
                  minimal simplicity. The bathroom and kitchenette are in an adjacent building, and shared with the
                  other person staying in the Banana Patch Cottage.
                </p>
                <p>
                  Living in the Mango Tree Cottage is an experience of living harmony: BEING OUTDOORS, BEING INDOORS,
                  simultaneously. This unique space allows you to fully immerse yourself in Hawaii's natural rhythms
                  while maintaining comfort and shelter.
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-serif text-2xl font-light mb-4">Amenities</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Leaf className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">Queen size bed</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mountain className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">Reading chair & work table</span>
                </div>
                <div className="flex items-center gap-3">
                  <Coffee className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">Shared kitchenette</span>
                </div>
                <div className="flex items-center gap-3">
                  <Wifi className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">High-speed WiFi (88 Mbps)</span>
                </div>
              </div>
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
                  <div className="text-3xl font-bold text-primary mb-2">$85/night</div>
                  <p className="text-sm text-muted-foreground">Single occupancy</p>
                  <div className="text-xl font-semibold text-primary mt-2">+$25/night</div>
                  <p className="text-sm text-muted-foreground">Second person</p>
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
                    High-speed WiFi included. $40 additional fee for month-long stays. 60-day maximum stay.
                  </p>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90">
                  <a href="/#contact">Book Your Stay</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
