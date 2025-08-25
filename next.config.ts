import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-dfa1629cd5b945839085d480c4c1a6cb.r2.dev",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
