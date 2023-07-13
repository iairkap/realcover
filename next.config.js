require("dotenv").config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SECRET_COOKIE_PASSWORD: process.env.SECRET_COOKIE_PASSWORD,
  },
};

module.exports = {
  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "another-domain.com",
      "yet-another-domain.com",
    ],
  },
};
