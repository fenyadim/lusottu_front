module.exports = {
  images: {
    domains: ['strapi.lusottu.live'],
  },
  future: {
    webpack5: true,
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
};
