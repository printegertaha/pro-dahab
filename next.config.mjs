/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "dhb.4tvshop.com" }],
  },
};

export default nextConfig;
