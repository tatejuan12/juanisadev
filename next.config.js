/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
    output: 'standalone',
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
        prependData: `@use "@styles/_imports.scss" as *;`
    },
    experimental: {
        serverActions: {
            allowedOrigins: ["202.62.147.12", "202.62.147.12:80"]
        }
    }
};
module.exports = nextConfig;
