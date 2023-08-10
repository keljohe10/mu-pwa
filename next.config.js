const withPWA = require("next-pwa");

module.exports = withPWA({
  dest: "public",
  register: true,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/jsonplaceholder\.typicode\.com/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
        },
        networkTimeoutSeconds: 10,
      },
    },
  ],
});
