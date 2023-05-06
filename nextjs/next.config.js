/** @type {import('next').NextConfig} */

const withPlugins = require("next-compose-plugins");

const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  swSrc: 'service-worker.js',
  skipWaiting: true,
});


const withTM = require("next-transpile-modules")([
	"@pusher/push-notifications-web",
]); // pass the modules you would like to see transpiled

const nextConfig = withPWA({
  reactStrictMode: true,
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
});

module.exports = withPlugins(
  [[withTM], [withPWA]],
  nextConfig
);;
