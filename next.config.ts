import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/invoice-card-payment-navi",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
