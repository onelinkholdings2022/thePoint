/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "drive.google.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "*.googleusercontent.com" },
      { protocol: "https", hostname: "www.figma.com" },
    ],
  },
  // Prevent bundling googleapis — let Node.js resolve it natively (saves ~3-5s compile time)
  serverExternalPackages: ["googleapis", "google-auth-library"],
  experimental: {
    // Tree-shake large client packages so Turbopack only bundles what's used
    optimizePackageImports: ["framer-motion", "lucide-react", "@radix-ui/react-slot"],
  },
};

export default nextConfig;
