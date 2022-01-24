/** @type {import('next').NextConfig} */
const withImages = require('next-images')

module.exports = {
  reactStrictMode: true,
  exports: withImages,
}
