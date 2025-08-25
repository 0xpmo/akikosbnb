"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Leaf, Mountain, Waves, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slides = [
    {
      image: "/images/akiko-full-logo.png",
      title: "", // No text overlay for logo slide
      subtitle: "",
      imageStyle: "object-contain",
    },
    {
      image: "/images/buddha-statue.png",
      title: "Sacred Sanctuary",
      subtitle: "Where ancient wisdom meets island tranquility",
      imageStyle: "object-cover",
    },
    {
      image: "/images/court.png",
      title: "Peaceful Sanctuary",
      subtitle: "Where tranquility meets tropical beauty",
      imageStyle: "object-cover",
    },
    {
      image: "/images/looking-out.png",
      title: "Natural Connection",
      subtitle: "Immerse yourself in Hawaii's sacred nature",
      imageStyle: "object-cover",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/images/akiko-full-logo.png" alt="Akiko's Buddhist B&B" className="h-12 w-auto" />
            <div>
              <h1 className="font-serif text-xl font-semibold text-foreground">Buddhist B&B</h1>
              <p className="text-sm text-muted-foreground">Wailea Village, Hamakua Coast</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#about" className="text-foreground hover:text-primary transition-colors">
              About Akiko
            </a>
            <a href="#accommodations" className="text-foreground hover:text-primary transition-colors">
              Stay
            </a>
            <a href="#activities" className="text-foreground hover:text-primary transition-colors">
              Activities
            </a>
            <a href="#facilities" className="text-foreground hover:text-primary transition-colors">
              Facilities & Grounds
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section with Slideshow */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <div
                className={`w-full h-full ${slide.imageStyle === "object-contain" ? "bg-gradient-to-br from-amber-50 to-orange-100" : ""}`}
                style={{
                  backgroundImage:
                    slide.imageStyle === "object-contain"
                      ? `url('${slide.image}')`
                      : `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${slide.image}')`,
                  backgroundSize: slide.imageStyle === "object-contain" ? "contain" : "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />
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

        {slides[currentSlide].title && (
          <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
            <h2 className="font-serif text-5xl md:text-7xl font-light mb-6 leading-tight">
              {slides[currentSlide].title}
            </h2>
            <p className="text-xl md:text-2xl font-light mb-8 leading-relaxed">{slides[currentSlide].subtitle}</p>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8 py-3">
              <a href="#contact">Begin Your Journey</a>
            </Button>
          </div>
        )}

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
      <section id="about" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/images/hostess-about-us.png"
                alt="Akiko Masuda in her garden"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h3 className="font-serif text-4xl font-light mb-6 text-foreground">Aloha & Welcome</h3>
              <div className="prose prose-lg text-muted-foreground leading-relaxed space-y-4">
                <p>
                  Thank you very much for visiting with us. Akiko's Buddhist Bed & Breakfast is located along the lush
                  and tropical Hamakua Coast, 15 miles north of Hilo.
                </p>
                <p>
                  Akiko Masuda, host and owner, is a 3rd generation Japanese woman, born in Honolulu in the 40's, long
                  before freeways, shopping malls, email, cell phones and hand held devices. She is a writer of
                  children's books, student of tai chi, yoga and zen meditation.
                </p>
                <p>
                  Akiko has been living in Wailea Village since '91, the first person to buy in this quiet, peaceful
                  country village in 35 years. Wailea is a wee, still-intact, plantation village with about 12
                  households which have seen very little change—a fleeting flashback in time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h3 className="font-serif text-4xl font-light mb-8 text-foreground">The Spirit of This Place</h3>
          <div className="prose prose-lg mx-auto text-muted-foreground leading-relaxed">
            <p className="text-xl mb-6">
              {
                "Our deep love for Hawaii flows through every moment here—its beauty, its human naturalness, its modesty and magnificent contrasts."
              }
            </p>
            <p className="text-lg mb-6">
              {
                "Yin and yang dance together: the dynamic interplay of soft and hard, cold and hot, silky and bumpy, modest and wild. Here you'll find both hot yoga and zazen stillness, the rhythm of older Hawaii—slower, more humane."
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

      {/* Accommodations */}
      <section id="accommodations" className="py-20">
        <div className="container mx-auto px-4">
          <h3 className="font-serif text-4xl font-light text-center mb-12 text-foreground">Sacred Spaces</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Link href="/banana-patch">
              <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div
                  className="h-48 bg-muted bg-cover bg-center"
                  style={{ backgroundImage: "url('/images/banana-patch-exterior.avif')" }}
                />
                <CardHeader>
                  <CardTitle className="font-serif">Banana Patch Cottage</CardTitle>
                  <CardDescription>Cozy cottage in the Banana Patch forest for one person</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Intimately nestled in a grove of banana trees. Hear the winds, rain dancing on the tin roof, and
                    falling mangoes when in season.
                  </p>
                  <div className="text-lg font-semibold text-primary">From $75/night</div>
                  <p className="text-xs text-muted-foreground">7 night minimum • Shared kitchen & bath</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/mango-tree">
              <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div
                  className="h-48 bg-muted bg-cover bg-center"
                  style={{ backgroundImage: "url('/images/mango-tree-exterior.avif')" }}
                />
                <CardHeader>
                  <CardTitle className="font-serif">Mango Tree Cottage</CardTitle>
                  <CardDescription>Roomy, airy cottage under giant mango tree for one or two persons</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    16 x 24 screened studio space, completely open to the outdoors. Experience living harmony: being
                    outdoors and indoors simultaneously.
                  </p>
                  <div className="text-lg font-semibold text-primary">From $85/night</div>
                  <p className="text-xs text-muted-foreground">7 night minimum • Queen bed • Shared kitchen & bath</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/puuhonua-house">
              <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div
                  className="h-48 bg-muted bg-cover bg-center"
                  style={{ backgroundImage: "url('/images/puuhonua-exterior.avif')" }}
                />
                <CardHeader>
                  <CardTitle className="font-serif">Pu'uhonua House</CardTitle>
                  <CardDescription>
                    Private cozy bedrooms, shared bathrooms and full kitchen in this classic "old Hawaiian" plantation
                    home
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our "community house" - a sanctuary where deep friendships are built. 4-bedroom, 2-story classic
                    with veranda overlooking Hawaiian garden.
                  </p>
                  <div className="text-lg font-semibold text-primary">From $75/night</div>
                  <p className="text-xs text-muted-foreground">7 night minimum • Shared spaces • 3 rooms available</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/hale-aloha">
              <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div
                  className="h-48 bg-muted bg-cover bg-center"
                  style={{ backgroundImage: "url('/images/hale-aloha-exterior.avif')" }}
                />
                <CardHeader>
                  <CardTitle className="font-serif">Hale Aloha</CardTitle>
                  <CardDescription>
                    Spacious & airy plantation style home with large picture windows opening to beautiful flowers and
                    gardens
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Home of Aloha and Warmth. Beautiful 3-bedroom, 1½ bath home surrounded by flowers and fruit trees.
                    Sleeps up to 4 people.
                  </p>
                  <div className="text-lg font-semibold text-primary">From $150/night</div>
                  <p className="text-xs text-muted-foreground">7 night minimum • Up to 4 guests • Private home</p>
                </CardContent>
              </Card>
            </Link>
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              All accommodations include high-speed WiFi and access to meditation spaces
            </p>
            <p className="text-sm text-muted-foreground">
              Discounts available for 2+ week stays (15%) and monthly stays (30%)
            </p>
          </div>
        </div>
      </section>

      {/* Activities */}
      <section id="activities" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h3 className="font-serif text-4xl font-light text-center mb-12 text-foreground">Activities & Experiences</h3>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Leaf className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-serif text-xl font-medium mb-2">Zazen Meditation</h4>
                  <p className="text-muted-foreground">
                    Sit Zazen meditation Wednesday & Friday nights—7:00-8:15 p.m. in our peaceful meditation space.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Mountain className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-serif text-xl font-medium mb-2">Yoga & Tai Chi</h4>
                  <p className="text-muted-foreground">
                    Practice restorative yoga 6-7:30pm Monday & Thursday, and attend tai chi & chi gong classes at
                    Hakalau Jodo Mission.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Waves className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-serif text-xl font-medium mb-2">Japanese Folk Dance</h4>
                  <p className="text-muted-foreground">
                    Join Japanese Folk dance practice and connect with the cultural heritage of the islands.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-serif text-xl font-medium mb-4">Community Activities</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Hakalau Farmers Market & FoodSHARE</li>
                  <li>• Work in the gardens on 2-acre grounds</li>
                  <li>• Occasional dinners and movies with guests</li>
                  <li>• Explore the citrus orchard and breadfruit grove</li>
                  <li>• Island exploration and cultural sites</li>
                </ul>
              </div>

              <div>
                <h4 className="font-serif text-xl font-medium mb-4">The Hamakua Coast</h4>
                <p className="text-muted-foreground mb-4">
                  The drive to Akiko's on Highway 19 is a colorful panorama of small plantation communities with small
                  rusted tin roof houses, mom and pop stores, sweeping ocean vistas, farmlands, pastures, rushing
                  streams and breathtaking waterfalls.
                </p>
                <p className="text-muted-foreground">
                  All that make our Hamakua Coast so extraordinary: a Special Place, whose spirit, cultural history,
                  values, land, and peoples are honored and perpetuated.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities & Grounds */}
      <section id="facilities" className="py-20">
        <div className="container mx-auto px-4">
          <h3 className="font-serif text-4xl font-light text-center mb-12 text-foreground">
            Sacred Facilities & Grounds
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Dojo/Yoga Studio */}
            <Card className="overflow-hidden">
              <div
                className="h-48 bg-muted bg-cover bg-center"
                style={{ backgroundImage: "url('/images/dojo-yoga-studio.jpeg')" }}
              />
              <CardHeader>
                <CardTitle className="font-serif">Dojo & Yoga Studio</CardTitle>
                <CardDescription>Spacious movement and meditation space</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Large, open studio with wooden floors and natural lighting, perfect for yoga, tai chi, and movement
                  practices. Features exposed beam ceiling and views of tropical gardens.
                </p>
              </CardContent>
            </Card>

            {/* Meditation Room */}
            <Card className="overflow-hidden">
              <div
                className="h-48 bg-muted bg-cover bg-center"
                style={{ backgroundImage: "url('/images/meditation-room.jpeg')" }}
              />
              <CardHeader>
                <CardTitle className="font-serif">Meditation Room</CardTitle>
                <CardDescription>Quiet contemplation space</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Serene indoor space with large windows overlooking lush tropical gardens. Perfect for group
                  meditation, quiet reflection, and intimate gatherings.
                </p>
              </CardContent>
            </Card>

            {/* Temple of Gratitude */}
            <Card className="overflow-hidden">
              <div
                className="h-48 bg-muted bg-cover bg-center"
                style={{ backgroundImage: "url('/images/temple-gratitude-sign.jpeg')" }}
              />
              <CardHeader>
                <CardTitle className="font-serif">Temple of Gratitude</CardTitle>
                <CardDescription>Sacred outdoor sanctuary</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  A special meditation area nestled within the tropical gardens, marked by our welcoming sign. A place
                  for deeper spiritual practice and connection with nature.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16">
            <h4 className="font-serif text-2xl font-light text-center mb-8 text-foreground">
              Two-Acre Tropical Paradise
            </h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
              <div
                className="h-32 bg-muted bg-cover bg-center rounded-lg"
                style={{ backgroundImage: "url('/images/property-garden-1.avif')" }}
              />
              <div
                className="h-32 bg-muted bg-cover bg-center rounded-lg"
                style={{ backgroundImage: "url('/images/property-garden-2.avif')" }}
              />
              <div
                className="h-32 bg-muted bg-cover bg-center rounded-lg"
                style={{ backgroundImage: "url('/images/property-garden-3.avif')" }}
              />
              <div
                className="h-32 bg-muted bg-cover bg-center rounded-lg"
                style={{ backgroundImage: "url('/images/property-garden-4.avif')" }}
              />
              <div
                className="h-32 bg-muted bg-cover bg-center rounded-lg"
                style={{ backgroundImage: "url('/images/property-garden-5.avif')" }}
              />
            </div>
            <p className="text-center text-muted-foreground mt-6 max-w-3xl mx-auto">
              Wander through our lush tropical gardens featuring native Hawaiian plants, fruit trees, and peaceful
              pathways. The grounds include citrus orchards, breadfruit groves, and countless quiet spots for reflection
              and connection with nature.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h3 className="font-serif text-4xl font-light text-center mb-12 text-foreground">Connect With Us</h3>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h4 className="font-serif text-2xl font-medium mb-6">Get in Touch</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">akikobandb@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">(808) 963-6422</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">Wailea Village, Hamakua Coast, Hawaii</span>
                  </div>
                </div>
              </div>

              <div>
                <h5 className="font-serif text-lg font-medium mb-3">A Special Place</h5>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Located in Wailea Village, a quiet, peaceful country plantation village that has seen very little
                  change—a fleeting flashback in time. The spirit, cultural history, values, land, and peoples are
                  honored and perpetuated through our community.
                </p>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Send a Message</CardTitle>
                <CardDescription>
                  {"We'd love to hear from you and answer any questions about your stay."}
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
                    <Input id="email" type="email" placeholder="your@email.com" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="dates">Preferred Dates</Label>
                  <Input id="dates" placeholder="When would you like to visit?" />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your intentions for this retreat..."
                    className="min-h-[100px]"
                  />
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90">Send Message</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6">
            <img src="/images/akiko-full-logo.png" alt="Akiko's Buddhist B&B" className="h-16 w-auto mx-auto mb-4" />
            <p className="text-muted-foreground max-w-md mx-auto">
              In gratitude to our ancestors and in service to all who come seeking awakening in Hawaii's sacred beauty.
            </p>
          </div>
          <p className="text-sm text-muted-foreground">© 2024 {"Akiko's Buddhist B&B"}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
