/** @type {import('next').NextConfig} */
const nextConfig = {
  logging:{
    fetches:{
      fullUrl:true
    }
  },
  images: {
    remotePatterns: [{ hostname: "imagedelivery.net" }],
  },
};

export default nextConfig;
