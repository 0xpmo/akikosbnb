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
import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

export default function Contact() {
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

      {/* Contact Section */}
      <section
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
    </div>
  );
}
