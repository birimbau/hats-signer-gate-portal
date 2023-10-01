/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };

    // // Setting up the alias
    // config.resolve.alias = {
    //   ...config.resolve.alias,
    //   'wagmi/dist/connectors/safe': '@wagmi/core/connectors/safe',
    // };
    return config;
  },
};

module.exports = nextConfig;
