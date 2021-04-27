module.exports = {
  future: {
    webpack5: true,
  },
  images: {
    domains: ['strapi.lusottu.live'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/1',
        permanent: true,
      },
    ];
  },
  // basePath: '/home',
};
