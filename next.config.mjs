/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "dhb.4tvshop.com" },
      { protocol: "https", hostname: "i.pinimg.com" },
      {
        protocol: "https",
        hostname: "imgs.search.brave.com",
        pathname: "/**", // يسمح بأي مسار صور تحت الدومين ده
      },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
  },
  cacheComponents: true,
};

export default nextConfig;
