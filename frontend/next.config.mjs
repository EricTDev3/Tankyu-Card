/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://tankyu-card.onrender.com/:path*",
      },
    ];
  },
};

export default nextConfig;
