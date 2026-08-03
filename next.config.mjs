/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next 16 removed the `eslint` config option along with `next build`'s
  // built-in lint step, so there is nothing left to opt out of here.
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [320, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    loader: "default",
    unoptimized: false,
  },
};

export default nextConfig;
