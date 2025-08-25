"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Coffee, Mountain, Users, BookOpen, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function PuuhouaHouse() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const images = [
    {
      src: "/images/puuhonua-exterior.avif",
      alt: "Pu'uhonua House exterior - classic plantation style with veranda",
    },
    {
      src: "/images/puuhonua-living-room.avif",
      alt: "Living room with library and comfortable seating",
    },
    {
      src: "/images/puuhonua-common-area.avif",
      alt: "Common area with natural lighting and homey atmosphere",
    },
    {
      src: "/images/puuhonua-kitchen.avif",
      alt: "Fully-equipped kitchen and dining area",
    },
    {
      src: "/images/puuhonua-sunrise-room.avif",
      alt: "The Sunrise Room with first morning light streaming through windows",
    },
    {
      src: "/images/puuhonua-rainforest-room.avif",
      alt: "The Rainforest Room surrounded by lush tropical vegetation",
    },
    {
      src: "/images/puuhonua-tree-tops-room.avif",
      alt: "The Elegant Tree Tops Room with beautiful canopy views",
    },
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
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <img src={image.src || "/placeholder.svg"} alt={image.alt} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30" />
            </div>
          ))}

          {/* Navigation buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors z-20 pointer-events-auto"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors z-20 pointer-events-auto"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Slide indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors pointer-events-auto ${
                  index === currentSlide ? "bg-white" : "bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Text overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="text-center text-white">
            <h1 className="font-serif text-5xl font-light mb-4">Pu'uhonua House</h1>
            <p className="text-xl">Sanctuary • Community • Old Hawaii</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="font-serif text-3xl font-light mb-6">A Place of Refuge & Community</h2>
              <div className="prose prose-lg text-muted-foreground leading-relaxed space-y-4">
                <p>
                  The Pu'uhonua House is our "community house." PU'UHONUA means "sanctuary", a safe place, a place of
                  refuge. It is a 4-bedroom, 2-story "classic," with a veranda overlooking a Hawaiian garden.
                </p>
                <p>
                  The SUNRISE ROOM & ELEGANT TREE TOPS ROOM both sleep 1 or 2 people. The RAINFOREST ROOM sleeps 1
                  person. The 1-3 guests share a comfortable living room, a large & diverse library, a fully-equipped
                  kitchen, a cozy dining nook and bathroom.
                </p>
                <p>
                  Deep, long lasting friendships are built as guests share and experience the "transformation" of living
                  and sharing together the "homey" serenity & simplicity—a "spirit" from the by-gone days of "old
                  Hawaii."
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-serif text-2xl font-light mb-4">Available Rooms</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-medium">Sunrise Room</h4>
                  <p className="text-sm text-muted-foreground">Sleeps 1-2 people • Morning light & garden views</p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-medium">Elegant Tree Tops Room</h4>
                  <p className="text-sm text-muted-foreground">Sleeps 1-2 people • Elevated views of the canopy</p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-medium">Rainforest Room</h4>
                  <p className="text-sm text-muted-foreground">Sleeps 1 person • Intimate forest connection</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-serif text-2xl font-light mb-4">Shared Amenities</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">Large diverse library</span>
                </div>
                <div className="flex items-center gap-3">
                  <Coffee className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">Fully-equipped kitchen</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">Comfortable living room</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mountain className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">Veranda with garden views</span>
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
                  <div className="text-3xl font-bold text-primary mb-2">$75/night</div>
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
                    60-day maximum stay. Shared living spaces foster community and lasting friendships.
                  </p>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90">
                  <a href="/#contact">Book Your Sanctuary</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
