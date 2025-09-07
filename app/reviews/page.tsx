"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Quote, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const reviews = [
  {
    id: 1,
    text: "Since we've came back from Hawaii, we often think of you. We also talk about the way you welcomed us to you're place. Our bicycle journey on Hawaii was fantastic but the souvenir that we cherish to most is the meeting with you. It's indescribable , especially in a second language!!!",
    author: "FRANCE and SIMON",
    location: "",
  },
  {
    id: 2,
    text: "To stay at Akiko's Buddhist B&B is to step into Old Hawai'i, a place and time and way of life that is a wonder to discover. The sounds of gentle wind chimes and waterfalls, the fragrances of gardenia and meditation incense, the flavors of just-picked papaya and a neighbor's homemade preserves all invite a feeling of reverence for life's simplest gifts. I trade in my regularly scheduled days for a tranquil stillness that allows me to be open to whatever life has to offer in that moment.",
    author: "Katy Fogg",
    location: "",
  },
  {
    id: 3,
    text: 'Being a guest at Akiko\'s Buddist B&B is a blessing. The surroundings support peace, love and a deep respect for the beauty of the environment. It offered me a space for reflection and an opportunity to "slow down" the pace of my busy life. I am filled with gratitude for the friendships I made and the comfort I found being in this very special place.',
    author: "Deb Keyes",
    location: "Harbor Springs, Michigan",
  },
  {
    id: 4,
    text: "I have such gratitude for the time I spent with you in Hawaii. Remember when you told us to expect big changes from our experience in Hawaii? It did change my life. I'm right in the middle of a HUGE life change. Our company laid off 25% of the people in our department, including me, at the end of April. After I recovered from the initial shock of the layoff I realized what a blessing it was. Over the past two years, I have been getting more and more ready to do something else and this has given me the opportunity. And what an opportunity it is! I remember sitting around the table in your kitchen with Lisa, Dee and you and talking about our desire to live a simpler life. Your life choices inspired me then and continue to inspire me today. I've decided it's time to live a simpler life myself and to follow my passion, which is photography. I'm starting my own business as a photographer. I have much to learn but I am having so much joy learning it. I don't expect to become rich and famous -- I just need to supplement my retirement savings a bit. I am having so much fun.",
    author: "Marilyn",
    location: "",
    closing: "In gratitude and aloha",
  },
  {
    id: 5,
    text: "Every once in a great while, you make a choice that turns out so right you have to wonder how you were so lucky to have made it..... Tucked away in a tiny village on the Hamakua Coast, Akiko's Buddhist Bed & Breakfast will not be everyone's first choice, but for those who choose the rustic plantation lodgings it will be an experience that will stay with you long after you have let the islands. It is a place of simple pleasures - sharing breakfast with new friends, reading a good book on the lanai, walking through the bamboo forest to the beach, watching the stars rise and set. It is a place infused with the spirit of old Hawaii and an understanding of the nuances of aloha. I have travelled many places and gathered many memories, but rarely have I encountered a place so affecting, whose presence changed how I see my day-to-day life back home. Miss Akiko is truly a gem, and a visit to her home - a chance at the \"road not taken\".",
    author: "Dave Millar",
    location: "",
  },
];

export default function ReviewsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
              <p className="text-sm text-white/70 font-['Yuji_Boku']">
                Hakalau, Hamakua Coast, Hawaii
              </p>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-white hover:text-white/80 transition-colors font-['Yuji_Boku']"
            >
              Home
            </Link>
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
              href="/reviews"
              className="text-white hover:text-white/80 transition-colors font-['Yuji_Boku'] border-b border-white/40"
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
                className="text-white hover:text-white/80 transition-colors font-['Yuji_Boku'] py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Facilities & Grounds
              </Link>
              <Link
                href="/reviews"
                className="text-white hover:text-white/80 transition-colors font-['Yuji_Boku'] py-2 border-b border-white/40 pb-3"
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

      {/* Main Content */}
      <section
        className="pb-20"
        style={{
          backgroundImage:
            "url('/homescreen/calligraphy-paper-bg.png'), url('/homescreen/calligraphy-paper-bg-option.png')",
          backgroundSize: "cover, cover",
          backgroundAttachment: "scroll, fixed",
          backgroundRepeat: "no-repeat, no-repeat",
          backgroundPosition: "center top, center top",
          paddingTop: "7px",
        }}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Page Header */}
          <div className="text-center mb-16" style={{ marginTop: "25px" }}>
            <h1 className="font-['Yuji_Boku'] text-5xl md:text-6xl font-light mb-6 text-foreground drop-shadow-sm">
              Guest Reflections
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Words from hearts touched by the spirit of this sacred place. Each
              stay becomes a journey of transformation, connection, and deep
              awakening to Hawaii's timeless aloha.
            </p>
          </div>

          {/* Reviews Grid */}
          <div className="space-y-12">
            {reviews.map((review, index) => (
              <Card
                key={review.id}
                className={`group relative overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-500 ${
                  index % 2 === 0 ? "md:mr-12 lg:mr-24" : "md:ml-12 lg:ml-24"
                }`}
                style={{
                  backgroundImage:
                    "url('/homescreen/calligraphy-paper-bg-option.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <CardContent className="p-8 md:p-12 relative">
                  {/* Quote Icon */}
                  <div className="absolute top-6 left-6 text-primary/20">
                    <Quote className="h-12 w-12" />
                  </div>

                  {/* Review Text */}
                  <div className="relative z-10 pl-8">
                    <blockquote className="text-lg md:text-xl leading-relaxed text-foreground font-['Sawarabi_Mincho'] italic mb-6">
                      "{review.text}"
                    </blockquote>

                    {review.closing && (
                      <p className="text-base text-muted-foreground italic mb-4">
                        {review.closing}
                      </p>
                    )}

                    {/* Author */}
                    <div className="flex flex-col">
                      <cite className="text-lg font-medium text-primary not-italic font-['Yuji_Boku']">
                        — {review.author}
                      </cite>
                      {review.location && (
                        <span className="text-sm text-muted-foreground mt-1">
                          {review.location}
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-20">
            <Card
              className="max-w-4xl mx-auto border-none shadow-lg"
              style={{
                backgroundImage:
                  "url('/homescreen/calligraphy-paper-bg-option.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <CardContent className="p-12">
                <h3 className="font-['Yuji_Boku'] text-3xl font-light mb-6 text-foreground">
                  Begin Your Own Sacred Journey
                </h3>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Join the countless souls who have found peace, transformation,
                  and deep connection in this sacred sanctuary. Your retreat
                  awaits.
                </p>
                <div className="flex justify-center">
                  <Link href="/#accommodations">
                    <Button
                      size="lg"
                      className="bg-primary hover:bg-primary/90 font-['Yuji_Boku'] px-8 cursor-pointer"
                    >
                      View Accommodations
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Footer */}
          <footer className="py-12 mt-20 border-t border-muted/20">
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
                © 2025 Akiko's Buddhist B&B. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </section>
    </div>
  );
}
