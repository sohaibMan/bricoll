/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    register: true,
    skipWaiting: true,
});
const nextConfig = withPWA({
    reactStrictMode: true,
    webpack(config) {
        config.experiments = {...config.experiments, topLevelAwait: true};
        return config;
    },
    output: 'standalone',
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },

});

module.exports = nextConfig;
