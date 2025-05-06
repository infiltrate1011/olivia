/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "ALLOWALL",
          },
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors 'self' https://*.myshopify.com https://myshopify.com https://fruitstand-skin.myshopify.com https://www.fruitstand-skin.myshopify.com",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
