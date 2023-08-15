require("dotenv").config();

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  env: {
    SECRET_COOKIE_PASSWORD: process.env.SECRET_COOKIE_PASSWORD,
  },
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

module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias["@next/swc-linux-x64-musl"] = false;
      config.resolve.alias["@next/swc-linux-x64-gnu"] = false;
      config.resolve.alias["node_modules/typescript/lib"] = false;
    }

    return config;
  },
};
