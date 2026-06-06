/** @type {import('next').NextConfig} */
const isGhPages = process.env.GH_PAGES_BUILD === "1";
const isHostinger = process.env.HOSTINGER_BUILD === "1";
const isStaticExport = isGhPages || isHostinger;

const nextConfig = {
  ...(isStaticExport && {
    output: "export",
    ...(isGhPages && {
      basePath: "/chacocoach",
      assetPrefix: "https://josedaminato.github.io/chacocoach",
    }),
  }),
  images: {
    ...(isStaticExport && { unoptimized: true }),
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "**.cdninstagram.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
