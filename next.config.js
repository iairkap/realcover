require("dotenv").config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SECRET_COOKIE_PASSWORD: process.env.SECRET_COOKIE_PASSWORD,
  },
};

module.exports = {
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      net: false,
      dns: false,
      child_process: false,
      tls: false,
    };

    return config;
  },

  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "another-domain.com",
      "yet-another-domain.com",
    ],
  },
};
