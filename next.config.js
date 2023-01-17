/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // rewrites: async () => {
  //   return [
  //     {
  //       source: '/api/users',
  //       destination: 'http://localhost:3000/api/users',
  //     },
  //     {
  //       source: '/api/users/:userid',
  //       destination: 'http://localhost:3000/api/users/:userid',
  //     },
  //   ];
  // },
}

module.exports = nextConfig
