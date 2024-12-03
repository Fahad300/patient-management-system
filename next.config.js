/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  webpack: (config) => {
    config.externals = [...config.externals, { "agora-rtc-sdk-ng": "AgoraRTC" }];
    return config;
  },
};

module.exports = nextConfig; 