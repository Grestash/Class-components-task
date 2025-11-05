const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [new URL('https://rickandmortyapi.com/api/character/avatar/**')],
      },
};

module.exports = withNextIntl(nextConfig);