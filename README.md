# Akiko's Buddhist B&B - Developer Documentation

A Next.js website for Akiko's Buddhist Bed & Breakfast, a tranquil retreat located on the Hamakua Coast of Hawaii.

## 🛠️ Tech Stack

This is a **Next.js 15** website built with:

- **Framework:** Next.js 15 with React 19
- **Styling:** Tailwind CSS 4.1.9
- **UI Components:** Radix UI primitives with custom styling
- **Fonts:** Google Fonts (Yuji Boku, Sawarabi Mincho, Geist, Manrope, Noto Sans)
- **Images:** Optimized WebP/AVIF formats with Next.js Image component
- **TypeScript:** Full TypeScript support
- **Deployment:** Static site generation with Next.js export

### Key Features

- Responsive design optimized for all devices
- Image optimization with multiple formats (WebP/AVIF)
- Video backgrounds and slideshows
- Interactive image galleries with modal navigation
- Contact form with email integration (EmailJS)
- SEO optimized with proper metadata
- Static site generation for fast deployment

## 🚀 Development Setup

### Prerequisites

- Node.js 18+ (recommended: use nvm for version management)
- Git
- A code editor (VS Code recommended)

### Local Development

1. **Clone the repository:**

```bash
git clone <repository-url>
cd akikosbnb
```

2. **Install dependencies:**

```bash
npm install
```

3. **Start the development server:**

```bash
npm run dev
```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server

## 📁 Project Structure

```
akikosbnb/
├── app/                    # Next.js app directory (App Router)
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Root layout with providers
│   ├── globals.css        # Global styles and Tailwind imports
│   ├── banana-patch/      # Banana Patch Cottage page
│   ├── contact/           # Contact page with form
│   ├── facilities/        # Amenities and facilities page
│   ├── hale-aloha/        # Hale Aloha accommodation page
│   ├── mango-tree/        # Mango Tree Cottage page
│   ├── puuhonua-house/    # Pu'uhonua House page
│   └── reviews/           # Guest reviews page
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components (Button, Card, Input, etc.)
│   └── theme-provider.tsx # Theme context provider
├── lib/                  # Utility functions and configurations
│   ├── email.ts          # Email handling utilities
│   ├── emailjs.ts        # EmailJS integration
│   └── utils.ts          # General utilities (cn function, etc.)
├── public/               # Static assets (images, videos, etc.)
│   ├── homescreen/       # Homepage hero images and videos
│   ├── banana/           # Banana Patch accommodation images
│   ├── mango/            # Mango Tree Cottage images
│   ├── puuhonua/         # Pu'uhonua House images
│   ├── hale/             # Hale Aloha images
│   ├── grounds/          # Property grounds and common areas
│   └── facilities/       # Yoga studio, zendo, and amenity images
├── scripts/              # Build and optimization scripts
│   └── optimize-images.js # Image optimization script
├── out/                  # Static export output (generated)
├── package.json          # Dependencies and scripts
├── next.config.mjs       # Next.js configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── components.json       # shadcn/ui components configuration
```

## 🔄 Git Workflow & Development Process

### Branch Strategy

- **`main`** - Production-ready code
- **`feature/*`** - Feature branches (e.g., `feature/contact-form-update`)
- **`bugfix/*`** - Bug fix branches (e.g., `bugfix/mobile-layout-issue`)

### Making Changes

1. **Create a new branch:**

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b bugfix/issue-description
```

2. **Make your changes:**

- Write clean, readable code
- Follow TypeScript best practices
- Use meaningful commit messages
- Test your changes locally

3. **Commit your changes:**

```bash
git add .
git commit -m "feat: add new contact form validation"
# or
git commit -m "fix: resolve mobile navigation menu issue"
```

4. **Push your branch:**

```bash
git push origin feature/your-feature-name
```

### Creating Pull Requests

1. **Push your branch to GitHub:**

```bash
git push origin feature/your-feature-name
```

2. **Create a Pull Request:**

   - Go to the GitHub repository
   - Click "Compare & pull request"
   - Add a descriptive title and description
   - **Add @0xpmo as a reviewer**

3. **Pull Request Description:**
   - Describe what was changed
   - Add any relevant screenshots if visual changes were made
   - @0xpmo will review and merge if it looks good

## 🎨 Design Guidelines

### Design Philosophy

### Development Guidelines

- **TypeScript:** Use strict typing, avoid `any` types
- **Components:** Create reusable, well-documented components
- **Styling:** Use Tailwind CSS classes, avoid custom CSS when possible
- **Images:** Optimize images using the provided script, use Next.js Image component
- **Performance:** Consider Core Web Vitals, lazy load images and components
- **Mobile-First:** Design for mobile devices first, then enhance for desktop

## 🧪 Testing

Before committing, test your changes locally:

```bash
npm run dev
# Test all pages and functionality in your browser
```

## 🚀 Deployment

The site automatically deploys to Vercel when changes are merged into the `main` branch.

## 📄 License

© 2025 Akiko's Buddhist B&B. All rights reserved.
