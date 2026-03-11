/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
      {
        protocol: "https",
        hostname: "**.stripe.com",
      },
    ],
  },
  transpilePackages: ["@repo/ui", "@repo/database", "@repo/auth", "@repo/payments", "@repo/types", "@repo/utils"],
};

module.exports = nextConfig;
