/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    AXIOS_BASEURL: process.env.AXIOS_BASEURL,
  },
}

module.exports = nextConfig
