/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static exports
  output: 'standalone',
  
  // Configure transpilePackages for antd
  transpilePackages: ['@ant-design/icons', '@ant-design/cssinjs', 'antd', '@ant-design/icons-svg', 'rc-util'],
  
  // Disable strict mode for better antd compatibility
  reactStrictMode: false,
  
  // Configure webpack for antd
  webpack: (config) => {
    return config;
  },
};

module.exports = nextConfig; 