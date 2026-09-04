/** @type {import('next').NextConfig} */
const backendUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : "https://tankyu-card.onrender.com";

const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
