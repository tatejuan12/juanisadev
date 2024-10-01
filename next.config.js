/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
        prependData: `@use "@styles/_imports.scss" as *;`
    },
};
module.exports = nextConfig;



