module.exports = {
  images: {
    domains: ['a0490689.xsph.ru'],
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
