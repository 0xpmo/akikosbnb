# Akiko's Buddhist Bed & Breakfast

A tranquil Buddhist bed and breakfast website located on the Hamakua Coast of Hawaii, offering spiritual retreat and natural beauty in authentic Hawaii.

## 🌺 About

Akiko's Buddhist B&B is a sacred sanctuary nestled in Wailea Village, a quiet plantation village on the lush Hamakua Coast, 15 miles north of Hilo. The property offers a unique blend of spiritual practice, natural beauty, and authentic Hawaiian culture.

**Host:** Akiko Masuda - A 3rd generation Japanese woman, writer of children's books, and student of tai chi, yoga, and zen meditation who has been living in Wailea Village since 1991.

## 🏠 Accommodations

The property features four distinct accommodation options:

- **Banana Patch Cottage** - Cozy cottage in the Banana Patch forest for one person (From $75/night)
- **Mango Tree Cottage** - Roomy, airy cottage under giant mango tree for one or two persons (From $85/night)
- **Pu'uhonua House** - Private cozy bedrooms with shared bathrooms and full kitchen in a classic "old Hawaiian" plantation home (From $75/night)
- **Hale Aloha** - Spacious & airy plantation style home with large picture windows (From $150/night)

_All accommodations have a 7-night minimum stay requirement._

## 🧘 Amenities & Activities

### Sacred Spaces

- **Yoga Studio** - Large, open studio with wooden floors and natural lighting
- **Zendo** - Traditional meditation hall for zazen practice and quiet contemplation
- **Two-Acre Tropical Paradise** - Lush gardens with native Hawaiian plants, fruit trees, and peaceful pathways

### Activities

- **Zazen Meditation** - Wednesday & Friday nights (7:00-8:15 p.m.)
- **Yoga & Tai Chi** - Restorative yoga Monday & Thursday (6-7:30pm)
- **Japanese Folk Dance** - Cultural heritage connection
- **Community Activities** - Farmers Market, garden work, dinners, and island exploration

## 🛠️ Technical Details

This is a **Next.js 15** website built with:

- **Framework:** Next.js 15 with React 19
- **Styling:** Tailwind CSS 4.1.9
- **UI Components:** Radix UI primitives with custom styling
- **Fonts:** Google Fonts (Yuji Boku, Sawarabi Mincho, Geist, Manrope, Noto Sans)
- **Images:** Optimized WebP/AVIF formats with Next.js Image component
- **TypeScript:** Full TypeScript support

### Key Features

- Responsive design optimized for all devices
- Image optimization with multiple formats
- Video backgrounds and slideshows
- Interactive image galleries with modal navigation
- Contact form with email integration
- SEO optimized with proper metadata

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd akikosbnb
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

## 📁 Project Structure

```
akikosbnb/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles
│   ├── banana-patch/      # Banana Patch Cottage page
│   ├── contact/           # Contact page
│   ├── facilities/        # Amenities page
│   ├── hale-aloha/        # Hale Aloha page
│   ├── mango-tree/        # Mango Tree Cottage page
│   ├── puuhonua-house/    # Pu'uhonua House page
│   └── reviews/           # Guest reviews page
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   └── theme-provider.tsx
├── lib/                  # Utility functions
│   ├── email.ts          # Email handling
│   ├── emailjs.ts        # EmailJS integration
│   └── utils.ts          # General utilities
├── public/               # Static assets
│   ├── homescreen/       # Homepage images
│   ├── banana/           # Banana Patch images
│   ├── mango/            # Mango Tree images
│   ├── puuhonua/         # Pu'uhonua House images
│   ├── hale/             # Hale Aloha images
│   ├── grounds/          # Property grounds images
│   └── facilities/       # Amenity images
└── scripts/              # Build scripts
    └── optimize-images.js
```

## 🎨 Design Philosophy

The website embodies the spiritual and cultural essence of the property:

- **Authentic Hawaiian Aesthetics** - Traditional calligraphy paper backgrounds and natural imagery
- **Mindful Typography** - Japanese-inspired fonts (Yuji Boku, Sawarabi Mincho) for cultural authenticity
- **Serene Color Palette** - Earth tones and natural colors reflecting the tropical environment
- **Peaceful Interactions** - Smooth transitions and gentle animations
- **Accessibility** - Clean, readable design with proper contrast and navigation

## 📞 Contact Information

- **Email:** akikobandb@gmail.com
- **Phone:** (808) 963-6422
- **Location:** Hakalau, Hamakua Coast, Hawaii

## 🌿 The Spirit of This Place

> "Our deep love for Hawaii flows through every moment here—its beauty, its human naturalness, its modesty and magnificent contrasts. Yin and yang dance together: the dynamic interplay of soft and hard, cold and hot, silky and bumpy, modest and wild. Here you'll find both yoga and zazen stillness, the rhythm of older Hawaii—slower, more humane."

## 📄 License

© 2025 Akiko's Buddhist B&B. All rights reserved.

---

_In gratitude to our ancestors and in service to all who come seeking awakening in Hawaii's sacred beauty._
