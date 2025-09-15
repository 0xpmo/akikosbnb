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
import { Mail, Phone, MapPin, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { openEmailClient, BookingInquiryData } from "@/lib/email";

function ContactForm() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<BookingInquiryData>({
    name: "",
    accommodation: searchParams.get("accommodation") || "",
    dates: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const accommodations = [
    "Banana Patch Cottage",
    "Mango Tree Cottage",
    "Pu'uhonua House",
    "Hale Aloha",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Open native email client with pre-filled form data
      openEmailClient(formData);

      // Reset form
      setFormData({
        name: "",
        accommodation: "",
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
            <img
              src="/AKIKOSwhitetext.png"
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
              className="text-white hover:text-white/80 transition-colors font-['Yuji_Boku'] border-b border-white/40"
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
                className="text-white hover:text-white/80 transition-colors font-['Yuji_Boku'] py-2 border-b border-white/40 pb-3"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Contact Section */}
      <section
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
                    {errors.name && (
                      <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div className="form-field-container">
                    <Label htmlFor="accommodation">
                      Accommodation Interest
                    </Label>
                    <select
                      id="accommodation"
                      name="accommodation"
                      value={formData.accommodation}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-md form-select"
                    >
                      <option value="">Select an accommodation</option>
                      {accommodations.map((acc) => (
                        <option key={acc} value={acc}>
                          {acc}
                        </option>
                      ))}
                    </select>
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
                    {errors.message && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.message}
                      </p>
                    )}
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
              <img
                src="/akiko-black-logo.png"
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

export default function Contact() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      }
    >
      <ContactForm />
    </Suspense>
  );
}
